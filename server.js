'use strict';
/* Palava server: Express + Socket.IO.
   Storage: in-memory state, snapshotted to MongoDB (MONGODB_URI) or data.json.
   This is the MVP persistence layer; swap for real collections when merging DistroChat v4. */
const express = require('express'), http = require('http'), path = require('path');
const crypto = require('crypto'), fs = require('fs'), helmet = require('helmet');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000, PROD = process.env.NODE_ENV === 'production';
const DATA = process.env.DATA_FILE || path.join(__dirname, 'data.json');
const YEAR = 365 * 864e5, DAY30 = 30 * 864e5;
const ROOMS = [
  { id: 'ph', n: 'Port Harcourt Gist', d: 'Traffic, food, football and general noise', c: '#ff3100', i: 'map-pin' },
  { id: 'lag', n: 'Lagos After Hours', d: 'Go slow, Third Mainland, who is outside tonight?', c: '#0dbdff', i: 'moon' },
  { id: 'fb', n: 'Football Talk', d: 'Matchday banter. Respect the other fans.', c: '#6cff00', i: 'trophy' },
  { id: 'cmp', n: 'Campus Corner', d: 'Lectures, hostels, projects and runs', c: '#ff7d00', i: 'graduation-cap' },
  { id: 'dev', n: 'Dev Naija', d: 'Builders sharing wins, bugs and gigs', c: '#27a1f7', i: 'code' }
];
const NAME = /^[A-Za-z0-9_.]{3,20}$/;
const RESERVED = new Set(['admin', 'support', 'moderator', 'mod', 'system', 'root', 'palava', 'firetalk']);

/* ---------- state + persistence ---------- */
const db = { users: {}, sessions: {}, msgs: {}, read: {}, blocks: {}, reports: [] };
let byName = {}, col = null, saveT = null;
const reindex = () => { byName = {}; for (const u of Object.values(db.users)) byName[u.uc] = u.id; };
async function init() {
  if (process.env.MONGODB_URI) {
    const { MongoClient } = require('mongodb');
    const c = new MongoClient(process.env.MONGODB_URI);
    await c.connect();
    col = c.db(process.env.MONGODB_DB || 'palava').collection('state');
    const d = await col.findOne({ _id: 'snap' });
    if (d) Object.assign(db, JSON.parse(d.v));
  } else if (fs.existsSync(DATA)) Object.assign(db, JSON.parse(fs.readFileSync(DATA, 'utf8')));
  reindex();
}
async function persist() {
  const snap = JSON.stringify(db);
  try { col ? await col.replaceOne({ _id: 'snap' }, { _id: 'snap', v: snap }, { upsert: true }) : fs.writeFileSync(DATA, snap); }
  catch (e) { console.error('persist failed:', e.message); }
}
const save = () => { clearTimeout(saveT); saveT = setTimeout(persist, 2000); };
function purge() { // rooms keep 30 days (spec FR-MS-06); drop expired sessions
  const now = Date.now();
  for (const k of Object.keys(db.msgs)) if (k.startsWith('room:')) db.msgs[k] = db.msgs[k].filter(m => now - m.ts < DAY30);
  for (const k of Object.keys(db.sessions)) if (db.sessions[k].exp < now) delete db.sessions[k];
  save();
}

/* ---------- helpers ---------- */
const rnd = n => crypto.randomBytes(n).toString('base64url');
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const hashPw = (pw, salt = rnd(16)) => new Promise((ok, no) =>
  crypto.scrypt(pw, salt, 64, (e, k) => e ? no(e) : ok({ salt, hash: k.toString('hex') })));
const checkPw = async (pw, u) => {
  const { hash } = await hashPw(pw, u.salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(u.hash, 'hex'));
};
const hits = new Map(); // tiny sliding-window rate limiter
function limit(key, max, ms) {
  const n = Date.now(), a = (hits.get(key) || []).filter(t => n - t < ms);
  if (a.length >= max) { hits.set(key, a); return false; }
  a.push(n); hits.set(key, a); return true;
}
setInterval(() => { const n = Date.now(); for (const [k, a] of hits) if (!a.length || n - a[a.length - 1] > 864e5) hits.delete(k); }, 6e5).unref();
const pub = u => ({ username: u.name, guest: !!u.guest });
const blocked = (a, b) => (db.blocks[a] || []).includes(b) || (db.blocks[b] || []).includes(a);
const dmKey = (a, b) => 'dm:' + [a, b].sort().join(':');
const ser = m => ({ id: m.id, w: db.users[m.u] ? db.users[m.u].name : 'deleted user', t: m.t, ts: m.ts, cid: m.cid });
const hist = k => (db.msgs[k] || []).slice(-50).map(ser);

/* sessions: random token in an HttpOnly cookie, only its hash is stored; rolling 12 months (FR-ID-08) */
const getTok = h => { const m = /(?:^|;\s*)ft_sid=([^;]+)/.exec(h || ''); return m ? m[1] : null; };
function sessionUser(h, renew) {
  const t = getTok(h); if (!t) return null;
  const s = db.sessions[sha(t)];
  if (!s || s.exp < Date.now()) return null;
  const u = db.users[s.uid]; if (!u || u.banned) return null;
  if (renew) s.exp = Date.now() + YEAR;
  return { u, t };
}
const setCookie = (res, t) => res.cookie('ft_sid', t, { httpOnly: true, sameSite: 'lax', secure: PROD, maxAge: YEAR, path: '/' });
function startSession(res, uid) { const t = rnd(32); db.sessions[sha(t)] = { uid, exp: Date.now() + YEAR }; setCookie(res, t); save(); }
async function mk(name, pw) {
  const u = { id: rnd(9), name, uc: name.toLowerCase(), guest: !pw, created: Date.now() };
  if (pw) Object.assign(u, await hashPw(pw));
  db.users[u.id] = u; byName[u.uc] = u.id; save(); return u;
}
function checkCreds(name, pw) {
  if (typeof name !== 'string' || !NAME.test(name)) return 'Username: 3 to 20 letters, numbers, _ or .';
  if (RESERVED.has(name.toLowerCase())) return 'That username is reserved.';
  if (typeof pw !== 'string' || pw.length < 8 || pw.length > 128) return 'Password must be 8 to 128 characters.';
  return null;
}

/* ---------- http ---------- */
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives: { // no inline scripts. Inline style attributes only (needed for CSS variables set in markup).
      defaultSrc: ["'self'"], scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'], styleSrcAttr: ["'unsafe-inline'"],
      fontSrc: ['https://fonts.gstatic.com'], imgSrc: ["'self'", 'data:'], connectSrc: ["'self'"],
      objectSrc: ["'none'"], baseUri: ["'self'"], formAction: ["'self'"], frameAncestors: ["'none'"]
    }
  },
  hsts: PROD
}));
app.use('/api', express.json({ limit: '4kb' }));
app.use('/api', (req, res, next) => { // CSRF defence in depth: SameSite=Lax cookie + Origin check on writes
  if (req.method === 'POST') {
    const o = req.get('origin');
    try { if (o && new URL(o).host !== req.get('host')) return res.status(403).json({ error: 'Blocked.' }); }
    catch { return res.status(403).json({ error: 'Blocked.' }); }
  }
  next();
});
const need = (req, res) => { const s = sessionUser(req.headers.cookie, true); if (!s) res.status(401).json({ error: 'auth' }); return s; };

app.get('/healthz', (q, r) => r.send('ok'));
app.get('/api/me', (req, res) => {
  const s = need(req, res); if (!s) return;
  setCookie(res, s.t); save(); res.json({ user: pub(s.u) });
});
app.post('/api/guest', async (req, res) => {
  if (!limit('g:' + req.ip, 10, 36e5)) return res.status(429).json({ error: 'Too many new guests from here. Try later.' });
  let name; do name = 'guest_' + rnd(5).toLowerCase().replace(/[^a-z0-9]/g, 'x').slice(0, 6); while (byName[name]);
  const u = await mk(name, null); startSession(res, u.id); res.json({ user: pub(u) });
});
app.post('/api/signup', async (req, res) => {
  try {
    if (!limit('s:' + req.ip, 10, 36e5)) return res.status(429).json({ error: 'Too many attempts. Try later.' });
    const { username, password } = req.body || {}, bad = checkCreds(username, password);
    if (bad) return res.status(400).json({ error: bad });
    if (byName[username.toLowerCase()]) return res.status(409).json({ error: 'That username is taken.' });
    const s = sessionUser(req.headers.cookie, true); let u;
    if (s && s.u.guest) { // claim: keep the guest's history, give it a name and password
      u = s.u; delete byName[u.uc];
      Object.assign(u, { name: username, uc: username.toLowerCase(), guest: false }, await hashPw(password));
      byName[u.uc] = u.id; save();
    } else { u = await mk(username, password); startSession(res, u.id); }
    res.json({ user: pub(u) });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Server error.' }); }
});
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body || {}, un = String(username || '');
    if (!limit('l:' + req.ip + un.toLowerCase(), 10, 6e5)) return res.status(429).json({ error: 'Too many attempts. Wait a few minutes.' });
    const u = db.users[byName[un.toLowerCase()]], pw = String(password || '').slice(0, 128);
    const ok = u && u.hash ? await checkPw(pw, u) : (await hashPw(pw), false); // dummy hash keeps timing similar
    if (!ok) return res.status(401).json({ error: 'Wrong username or password.' });
    startSession(res, u.id); res.json({ user: pub(u) });
  } catch (e) { res.status(500).json({ error: 'Server error.' }); }
});
app.post('/api/logout', (req, res) => {
  const t = getTok(req.headers.cookie); if (t) { delete db.sessions[sha(t)]; save(); }
  res.clearCookie('ft_sid', { path: '/' }); res.json({ ok: 1 });
});
app.get('/api/dms', (req, res) => {
  const s = need(req, res); if (!s) return; const me = s.u.id, out = [];
  for (const [k, arr] of Object.entries(db.msgs)) {
    if (!k.startsWith('dm:') || !arr.length) continue;
    const [, a, b] = k.split(':'); if (a !== me && b !== me) continue;
    const peer = db.users[a === me ? b : a]; if (!peer || blocked(me, peer.id)) continue;
    const last = arr[arr.length - 1], rd = (db.read[k] || {})[me] || 0;
    out.push({ p: peer.name, l: last.t, ts: last.ts, u: arr.filter(m => m.ts > rd && m.u !== me).length });
  }
  res.json({ dms: out.sort((x, y) => y.ts - x.ts) });
});
app.get('/api/admin/reports', (req, res) => { // minimal moderation view; set ADMIN_TOKEN to enable
  const t = process.env.ADMIN_TOKEN, g = String(req.get('x-admin-token') || '');
  if (!t || g.length !== t.length || !crypto.timingSafeEqual(Buffer.from(g), Buffer.from(t))) return res.status(404).end();
  res.json({ reports: db.reports.slice(-200) });
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: PROD ? '1h' : 0 }));

/* ---------- realtime ---------- */
const server = http.createServer(app);
const io = new Server(server, {
  maxHttpBufferSize: 1e4,
  allowRequest: (req, cb) => { const o = req.headers.origin; try { cb(null, !o || new URL(o).host === req.headers.host); } catch { cb(null, false); } }
});
const online = new Map(); // uid -> socket count
const roomNames = id => {
  const ids = io.sockets.adapter.rooms.get('r:' + id) || new Set(), u = new Set();
  for (const sid of ids) { const s = io.sockets.sockets.get(sid); if (s) u.add(s.data.uid); }
  return [...u].map(i => db.users[i] && db.users[i].name).filter(Boolean);
};
const roomsState = () => ROOMS.map(r => { const p = roomNames(r.id); return { ...r, on: p.length, p: p.slice(0, 12) }; });
const onlineNames = () => [...online.keys()].map(i => db.users[i] && db.users[i].name).filter(Boolean);
let bt = null; // coalesce presence broadcasts
const broadcast = () => { if (bt) return; bt = setTimeout(() => { bt = null; io.emit('rooms', roomsState()); io.emit('online', onlineNames()); }, 400); };
const leaveRooms = s => { for (const r of s.rooms) if (r.startsWith('r:')) s.leave(r); };

io.use((sock, next) => {
  const s = sessionUser(sock.request.headers.cookie, true);
  if (!s) return next(new Error('auth'));
  sock.data.uid = s.u.id; next();
});
io.on('connection', sock => {
  const uid = sock.data.uid, fn = a => typeof a === 'function' ? a : () => {};
  sock.join('u:' + uid); online.set(uid, (online.get(uid) || 0) + 1);
  sock.emit('rooms', roomsState()); sock.emit('online', onlineNames()); broadcast();

  sock.on('room:join', (id, ack) => {
    ack = fn(ack); if (!ROOMS.some(r => r.id === id)) return ack({ error: 'room' });
    leaveRooms(sock); sock.join('r:' + id); ack({ history: hist('room:' + id) }); broadcast();
  });
  sock.on('room:leave', () => { leaveRooms(sock); broadcast(); });
  sock.on('dm:open', (peerName, ack) => {
    ack = fn(ack); const me = db.users[uid], peer = db.users[byName[String(peerName).toLowerCase()]];
    if (!me || me.guest) return ack({ error: 'claim' });
    if (!peer || peer.id === me.id || blocked(me.id, peer.id)) return ack({ error: 'peer' });
    const k = dmKey(me.id, peer.id); (db.read[k] = db.read[k] || {})[me.id] = Date.now(); save();
    ack({ history: hist(k) });
  });
  sock.on('msg:send', (p, ack) => {
    ack = fn(ack); const me = db.users[uid]; if (!me || !p || typeof p !== 'object') return ack({ error: 'bad' });
    if (!limit('m:' + uid, 20, 10000)) return ack({ error: 'rate' });
    const t = String(p.text == null ? '' : p.text).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, 1000);
    if (!t) return ack({ error: 'empty' });
    const cid = String(p.cid || '').slice(0, 40); let k, peer = null;
    if (p.kind === 'room') {
      if (!ROOMS.some(r => r.id === p.id) || !sock.rooms.has('r:' + p.id)) return ack({ error: 'room' });
      k = 'room:' + p.id;
    } else if (p.kind === 'dm') {
      if (me.guest) return ack({ error: 'claim' }); // guests have no DMs until they claim the account
      peer = db.users[byName[String(p.id).toLowerCase()]];
      if (!peer || peer.id === me.id || blocked(me.id, peer.id)) return ack({ error: 'peer' });
      k = dmKey(me.id, peer.id);
    } else return ack({ error: 'bad' });
    const arr = db.msgs[k] = db.msgs[k] || [];
    if (cid && arr.slice(-30).some(m => m.cid === cid && m.u === me.id)) return ack({ ok: 1 }); // idempotent retry
    const m = { id: rnd(6), u: me.id, t, ts: Date.now(), cid }; arr.push(m);
    const cap = p.kind === 'room' ? 300 : 500; if (arr.length > cap) arr.splice(0, arr.length - cap);
    if (peer) {
      io.to('u:' + me.id).emit('msg', { ...ser(m), k: 'dm:' + peer.name });
      io.to('u:' + peer.id).emit('msg', { ...ser(m), k: 'dm:' + me.name });
    } else io.to('r:' + p.id).emit('msg', { ...ser(m), k });
    save(); ack({ ok: 1 });
  });
  sock.on('report', (p, ack) => {
    ack = fn(ack); if (!p || !limit('r:' + uid, 10, 864e5)) return ack({ error: 'rate' });
    const kind = p.kind === 'dm' ? 'dm' : 'room', peer = kind === 'dm' && db.users[byName[String(p.id).toLowerCase()]];
    const k = kind === 'dm' ? (peer ? dmKey(uid, peer.id) : null) : 'room:' + p.id;
    db.reports.push({ id: rnd(6), by: uid, kind, target: String(p.id).slice(0, 40), reason: String(p.reason || '').slice(0, 60),
      snapshot: k ? (db.msgs[k] || []).slice(-10).map(ser) : [], at: Date.now(), status: 'open' });
    save(); ack({ ok: 1 });
  });
  sock.on('block', (name, ack) => {
    ack = fn(ack); const peer = db.users[byName[String(name).toLowerCase()]];
    if (peer && peer.id !== uid) { const b = db.blocks[uid] = db.blocks[uid] || []; if (!b.includes(peer.id)) b.push(peer.id); save(); }
    ack({ ok: 1 });
  });
  sock.on('disconnect', () => {
    const n = (online.get(uid) || 1) - 1; n ? online.set(uid, n) : online.delete(uid); broadcast();
  });
});

init().then(() => {
  purge(); setInterval(purge, 36e5).unref();
  server.listen(PORT, () => console.log('Palava listening on :' + PORT + (col ? ' (MongoDB)' : ' (file storage)')));
}).catch(e => { console.error('startup failed:', e.message); process.exit(1); });
const stop = async () => { clearTimeout(saveT); await persist(); process.exit(0); };
process.on('SIGTERM', stop); process.on('SIGINT', stop);
