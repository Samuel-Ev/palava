// End-to-end smoke test: node test/smoke.js (starts its own server on a temp port + temp data file)
const { spawn } = require('child_process'), { io } = require('socket.io-client'), os = require('os'), path = require('path'), assert = require('assert');
const PORT = 3111, B = 'http://localhost:' + PORT;
const env = { ...process.env, PORT, DATA_FILE: path.join(os.tmpdir(), 'ft-test-' + Date.now() + '.json'), NODE_ENV: 'test' };
const srv = spawn('node', ['server.js'], { env, stdio: 'inherit' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const post = async (p, body, cookie) => {
  const r = await fetch(B + p, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body || {}) });
  const c = (r.headers.get('set-cookie') || '').split(';')[0]; return { s: r.status, j: await r.json(), c };
};
const sock = c => new Promise((ok, no) => { const s = io(B, { extraHeaders: { Cookie: c }, transports: ['websocket'] }); s.on('connect', () => ok(s)); s.on('connect_error', no); });
const emit = (s, ev, a) => new Promise(r => s.emit(ev, a, r));
(async () => {
  try {
    for (let i = 0; i < 30; i++) { try { if ((await fetch(B + '/healthz')).ok) break; } catch {} await sleep(200); }
    assert.equal((await fetch(B + '/api/me')).status, 401, 'me requires auth');
    const h = await fetch(B + '/api/me'); const csp = h.headers.get('content-security-policy') || '';
    assert(csp.includes("script-src 'self'"), 'CSP set, got ' + h.status + ': ' + csp);
    const g = await post('/api/guest'); assert.equal(g.s, 200); assert(g.j.user.guest);
    assert.equal((await post('/api/signup', { username: 'ab', password: 'longenough1' }, g.c)).s, 400, 'short name rejected');
    assert.equal((await post('/api/signup', { username: 'admin', password: 'longenough1' }, g.c)).s, 400, 'reserved name rejected');
    assert.equal((await post('/api/signup', { username: 'tobi_ph', password: 'short' }, g.c)).s, 400, 'short password rejected');
    const sg = await sock(g.c);
    assert.equal((await emit(sg, 'dm:open', 'nobody')).error, 'claim', 'guest cannot DM');
    const claim = await post('/api/signup', { username: 'tobi_ph', password: 'longenough1' }, g.c);
    assert.equal(claim.s, 200); assert.equal(claim.j.user.guest, false, 'guest claimed');
    const u2 = await post('/api/signup', { username: 'ada_k', password: 'longenough2' });
    assert.equal((await post('/api/signup', { username: 'tobi_ph', password: 'longenough3' })).s, 409, 'case-insensitive unique');
    assert.equal((await post('/api/login', { username: 'tobi_ph', password: 'wrongwrong' })).s, 401);
    const login = await post('/api/login', { username: 'TOBI_ph', password: 'longenough1' }); assert.equal(login.s, 200);
    const a = await sock(login.c), b = await sock(u2.c);
    assert.equal((await emit(a, 'room:join', 'ph')).history.length >= 0, true);
    await emit(b, 'room:join', 'ph');
    const got = new Promise(r => b.once('msg', r));
    assert.equal((await emit(a, 'msg:send', { kind: 'room', id: 'ph', text: '  <b>Hi</b> there  ', cid: 'c1' })).ok, 1);
    const m = await got; assert.equal(m.t, '<b>Hi</b> there'); assert.equal(m.w, 'tobi_ph'); assert.equal(m.k, 'room:ph');
    await emit(a, 'msg:send', { kind: 'room', id: 'ph', text: 'again', cid: 'c1' }); // duplicate cid
    assert.equal((await emit(b, 'room:join', 'ph')).history.length, 1, 'idempotent cid, no duplicate');
    assert.equal((await emit(a, 'msg:send', { kind: 'room', id: 'lag', text: 'x' })).error, 'room', 'must join room first');
    const dm = new Promise(r => b.once('msg', r));
    assert.equal((await emit(a, 'msg:send', { kind: 'dm', id: 'ada_k', text: 'how far' })).ok, 1);
    assert.equal((await dm).k, 'dm:tobi_ph');
    const dms = await (await fetch(B + '/api/dms', { headers: { Cookie: u2.c } })).json();
    assert.equal(dms.dms[0].p, 'tobi_ph'); assert.equal(dms.dms[0].u, 1, 'unread count');
    assert.equal((await emit(b, 'report', { kind: 'dm', id: 'tobi_ph', reason: 'Spam or scam' })).ok, 1);
    await emit(b, 'block', 'tobi_ph');
    assert.equal((await emit(a, 'msg:send', { kind: 'dm', id: 'ada_k', text: 'hello?' })).error, 'peer', 'blocked');
    let rate = 0; for (let i = 0; i < 25; i++) if ((await emit(a, 'msg:send', { kind: 'room', id: 'ph', text: 'm' + i })).error === 'rate') rate++;
    assert(rate > 0, 'rate limit kicks in');
    const bad = await fetch(B + '/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://evil.example' }, body: '{}' });
    assert.equal(bad.status, 403, 'foreign origin blocked');
    await post('/api/logout', {}, login.c);
    assert.equal((await fetch(B + '/api/me', { headers: { Cookie: login.c } })).status, 401, 'logout revokes session');
    console.log('\nALL CHECKS PASSED');
  } catch (e) { console.error('\nFAILED:', e.message); process.exitCode = 1; }
  srv.kill('SIGTERM'); setTimeout(() => process.exit(), 500);
})();
