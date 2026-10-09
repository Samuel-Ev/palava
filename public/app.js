
(()=>{
const $=s=>document.querySelector(s);
const el=(t,c,x)=>{const n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n};
const ic=(n,s)=>{const i=el('i');i.dataset.lucide=n;if(s)i.style.setProperty('--s',s+'px');return i};
const PH={"cardsF":"<path d=\"M200,88V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V88A16,16,0,0,1,40,72H184A16,16,0,0,1,200,88Zm16-48H64a8,8,0,0,0,0,16H216V176a8,8,0,0,0,16,0V56A16,16,0,0,0,216,40Z\"/>","cardsR":"<path d=\"M184,72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V88A16,16,0,0,0,184,72Zm0,128H40V88H184V200ZM232,56V176a8,8,0,0,1-16,0V56H64a8,8,0,0,1,0-16H216A16,16,0,0,1,232,56Z\"/>","compassF":"<path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm51.58,57.79-32,64a4.08,4.08,0,0,1-1.79,1.79l-64,32a4,4,0,0,1-5.37-5.37l32-64a4.08,4.08,0,0,1,1.79-1.79l64-32A4,4,0,0,1,179.58,81.79Z\"/>","compassR":"<path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z\"/>","chat-circleF":"<path d=\"M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z\"/>","chat-circleR":"<path d=\"M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z\"/>","userF":"<path d=\"M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z\"/>","userR":"<path d=\"M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z\"/>","paper-plane-tiltF":"<path d=\"M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15L107,164.15a4,4,0,0,1,.77-4.58l57.92-57.92a8,8,0,0,0-11.31-11.31L96.43,148.26a4,4,0,0,1-4.58.77L17.08,112.64a16,16,0,0,1,2.49-29.8l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z\"/>","paper-plane-tiltR":"<path d=\"M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z\"/>","crown-simpleF":"<path d=\"M239.75,90.81c0,.11,0,.21-.07.32L217,195a16,16,0,0,1-15.72,13H54.71A16,16,0,0,1,39,195L16.32,91.13c0-.11-.05-.21-.07-.32A16,16,0,0,1,44,77.39l33.67,36.29,35.8-80.29a1,1,0,0,0,0-.1,16,16,0,0,1,29.06,0,1,1,0,0,0,0,.1l35.8,80.29L212,77.39a16,16,0,0,1,27.71,13.42Z\"/>","crown-simpleR":"<path d=\"M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z\"/>","flameF":"<path d=\"M173.79,51.48a221.25,221.25,0,0,0-41.67-34.34,8,8,0,0,0-8.24,0A221.25,221.25,0,0,0,82.21,51.48C54.59,80.48,40,112.47,40,144a88,88,0,0,0,176,0C216,112.47,201.41,80.48,173.79,51.48ZM96,184c0-27.67,22.53-47.28,32-54.3,9.48,7,32,26.63,32,54.3a32,32,0,0,1-64,0Z\"/>","flameR":"<path d=\"M173.79,51.48a221.25,221.25,0,0,0-41.67-34.34,8,8,0,0,0-8.24,0A221.25,221.25,0,0,0,82.21,51.48C54.59,80.48,40,112.47,40,144a88,88,0,0,0,176,0C216,112.47,201.41,80.48,173.79,51.48ZM96,184c0-27.67,22.53-47.28,32-54.3,9.48,7,32,26.63,32,54.3a32,32,0,0,1-64,0Zm77.27,15.93A47.8,47.8,0,0,0,176,184c0-44-42.09-69.79-43.88-70.86a8,8,0,0,0-8.24,0C122.09,114.21,80,140,80,184a47.8,47.8,0,0,0,2.73,15.93A71.88,71.88,0,0,1,56,144c0-34.41,20.4-63.15,37.52-81.19A216.21,216.21,0,0,1,128,33.54a215.77,215.77,0,0,1,34.48,29.27C193.49,95.5,200,125,200,144A71.88,71.88,0,0,1,173.27,199.93Z\"/>","arrow-upF":"<path d=\"M207.39,115.06A8,8,0,0,1,200,120H136v96a8,8,0,0,1-16,0V120H56a8,8,0,0,1-5.66-13.66l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,207.39,115.06Z\"/>","arrow-upR":"<path d=\"M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z\"/>","map-pinF":"<path d=\"M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z\"/>","map-pinR":"<path d=\"M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z\"/>","moonF":"<path d=\"M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z\"/>","moonR":"<path d=\"M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z\"/>","trophyF":"<path d=\"M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z\"/>","trophyR":"<path d=\"M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z\"/>","graduation-capF":"<path d=\"M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z\"/>","graduation-capR":"<path d=\"M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z\"/>","codeF":"<path d=\"M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM92.8,145.6a8,8,0,1,1-9.6,12.8l-32-24a8,8,0,0,1,0-12.8l32-24a8,8,0,0,1,9.6,12.8L69.33,128Zm58.89-71.4-32,112a8,8,0,1,1-15.38-4.4l32-112a8,8,0,0,1,15.38,4.4Zm53.11,60.2-32,24a8,8,0,0,1-9.6-12.8L186.67,128,163.2,110.4a8,8,0,1,1,9.6-12.8l32,24a8,8,0,0,1,0,12.8Z\"/>","codeR":"<path d=\"M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z\"/>","share-networkF":"<path d=\"M212,200a36,36,0,1,1-69.85-12.25l-53-34.05a36,36,0,1,1,0-51.4l53-34a36.09,36.09,0,1,1,8.67,13.45l-53,34.05a36,36,0,0,1,0,24.5l53,34.05A36,36,0,0,1,212,200Z\"/>","share-networkR":"<path d=\"M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z\"/>","pencil-simpleF":"<path d=\"M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM192,108.68,147.31,64l24-24L216,84.68Z\"/>","pencil-simpleR":"<path d=\"M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z\"/>"};
const NS='http://www.w3.org/2000/svg';
const ph=(n,s,f)=>{const v=document.createElementNS(NS,'svg');v.setAttribute('viewBox','0 0 256 256');v.setAttribute('width',s);v.setAttribute('height',s);v.setAttribute('fill','currentColor');v.setAttribute('aria-hidden','true');v.innerHTML=PH[n+(f?'F':'R')];return v};
const paint=()=>{lucide.createIcons();document.querySelectorAll('[data-ph]').forEach(e=>{e.replaceChildren(ph(e.dataset.ph,+e.dataset.s,!!e.dataset.f||e.classList.contains('stk')));e.removeAttribute('data-ph')})};
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const ME={u:'',guest:true};
const pal=['#ff3100','#0dbdff','#ff7d00','#6cff00','#ff5e00','#27a1f7','#ffd400','#ff4fa3'];
const colorFor=n=>pal[[...String(n)].reduce((a,c)=>a+c.charCodeAt(0),0)%pal.length];
const P=new Proxy({},{get(o,k){if(typeof k!=='string')return o[k];return o[k]||(o[k]=[colorFor(k),0])}});
let R=[],D=[],ONL=[],xs=0,cs=0;const store={};
const CH={Greetings:['Hi','How far?','How you dey?',"What's good?"],Reactions:['Lol 😂','Abeg 😭','Fire 🔥','Facts']};
const setMe=u=>{ME.u=u.username;ME.guest=!!u.guest};
const api=async(path,body)=>{const get=body===undefined;const r=await fetch('/api'+path,{method:get?'GET':'POST',headers:get?{}:{'Content-Type':'application/json'},body:get?undefined:JSON.stringify(body)});const j=await r.json().catch(()=>({}));if(!r.ok)throw Object.assign(new Error(j.error||'Something went wrong'),{status:r.status});return j};
const fmt=ts=>new Date(ts).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
const norm=m=>({id:m.id,w:m.w,t:m.t,tm:fmt(m.ts),me:m.w===ME.u?1:0,cid:m.cid});
const cnt=(n,r,sf='')=>{n.dataset.rc=r.id;n.dataset.sf=sf;n.textContent=r.on+sf;return n};
let sock=null;
let tab='home',cur=null,grp=null,filt='';

/* ---------- nav ---------- */
const tabs=[['home','cards','Home'],['explore','compass','Explore'],['chats','chat-circle','Chats'],['me','user','Profile']];
const rail=$('.rail');
tabs.forEach(([k,i,l])=>{const b=el('button','nb press');b.setAttribute('aria-label',l);b.dataset.k=k;b._i=i;b.append(el('small','',l));if(k==='chats')b.append(el('span','dot'));b.onclick=async()=>{tab=k;if(k==='chats'){try{D=(await api('/dms')).dms.map(d=>({...d,t:fmt(d.ts)}))}catch(e){}}renderList(true)};rail.append(b)});
const nav=()=>fix();
const fix=()=>rail.querySelectorAll('.nb').forEach(b=>{const a=b.dataset.k===tab;a?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current');b.querySelector('svg')?.remove();b.prepend(ph(b._i,28,a))});

/* ---------- list panel ---------- */
function seg(o,i,fn){const t=el('div','seg');t.style.setProperty('--n',o.length);t.style.setProperty('--k',i);t.setAttribute('role','tablist');t.append(el('span','thumb'));
 o.forEach((x,j)=>{const b=el('button',j===i?'on':'',x);b.setAttribute('role','tab');b.setAttribute('aria-selected',j===i);b.onclick=()=>{t.style.setProperty('--k',j);t.querySelectorAll('button').forEach((y,m)=>{y.classList.toggle('on',m===j);y.setAttribute('aria-selected',m===j)});fn(j)};t.append(b)});return t}
const emp=(i,t)=>{const e=el('div','empty');e.append(ic(i,40),el('p','hand',t));return e};
const av=(n,w)=>{const a=el('div','av'+(P[n][1]?' on':''));a.style.cssText=`--c:${P[n][0]};--w:${w}px`;a.textContent=n[0].toUpperCase();return a};
function stack(ns,n){const s=el('div','stack');ns.slice(0,2).forEach(x=>{const a=av(x,30);a.classList.remove('on');s.append(a)});if(n>0)s.append(el('b','','+'+n));return s}
function roomCard(r,j){const c=el('button','card press'+(cur&&cur.id===r.id?' sel':''));c.style.setProperty('--i',j);c.style.setProperty('--c',r.c);
 const ri=el('div','ri');ri.append(ph(r.i,28,1));const tx=el('div','tx');tx.append(el('div','nm',r.n),el('div','ds',r.d));c.append(ri,tx,cnt(el('div','ct'),r));c.onclick=()=>open('room',r.id);return c}
function feed(r,j){const c=el('article','fc');c.style.setProperty('--i',j);
 const hd=el('div','fh');const ri=el('div','ri');ri.style.setProperty('--c',r.c);ri.append(ph(r.i,24,1));const t=el('div');t.append(el('div','nm',r.n),el('div','ds','@'+r.id+' · live now'));hd.append(ri,t);
 const im=el('button','fph press');im.style.setProperty('--c',r.c);im.setAttribute('aria-label','Open '+r.n);const big=el('span','big');big.append(ph(r.i,170,1));
 const fb=el('div','fb');fb.append(stack(r.p,Math.max(0,r.on-2)),el('span','glass','Join'));im.append(big,cnt(el('span','glass lv'),r,' here'),fb);im.onclick=()=>open('room',r.id);
 c.append(hd,el('p','cap',r.d),im);return c}
const dmTo=n=>{if(!D.find(d=>d.p===n))D.unshift({p:n,l:'Say hi',t:'now',u:0});open('dm',n)};
function renderList(load){
 fix();const L=$('#list');L.replaceChildren();L.classList.toggle('pf',tab==='me');L.scrollTop=0;
 if(tab!=='me')L.append(el('h2','',{home:'Rooms',explore:'Explore',chats:'Chats'}[tab]));
 if(load){for(let i=0;i<4;i++)L.append(el('div','sk'));paint();return setTimeout(()=>renderList(false),RM?0:380)}
 if(tab==='home'){
  L.append(el('p','lab','Live now'));const lv=el('div','live');
  R.forEach(r=>{const b=el('button','lt press');const q=el('div','sq');q.style.setProperty('--c',r.c);const ic2=el('span');ic2.append(ph(r.i,28,1));q.append(ic2,cnt(el('b'),r));b.append(q,el('div','',r.n.split(' ')[0]));b.onclick=()=>open('room',r.id);lv.append(b)});
  L.append(lv,el('p','lab','All rooms'));R.forEach((r,j)=>L.append(roomCard(r,j)));
 }else if(tab==='explore'){
  const s=el('label','search');s.append(ic('search',20));const inp=el('input');inp.placeholder=xs?'Search people':'Search rooms';inp.value=filt;inp.setAttribute('aria-label','Search');s.append(inp);
  const body=el('div');
  const fill=()=>{body.replaceChildren();const q=filt.toLowerCase();
   if(!xs){const rs=R.filter(r=>r.n.toLowerCase().includes(q));rs.length?rs.forEach((r,j)=>body.append(feed(r,j))):body.append(emp('search-x','Nothing matches that.'))}
   else{const ns=ONL.filter(n=>n!==ME.u&&n.toLowerCase().includes(q));ns.length?ns.forEach((n,j)=>{const c=el('div','card row');c.style.setProperty('--i',j);const tx=el('div','tx');tx.append(el('div','nm',n),el('div','ds',P[n][1]?'Online now':'Away'));const b=el('button','pill sm press','Say hi');b.onclick=()=>dmTo(n);c.append(av(n,48),tx,b);body.append(c)}):body.append(emp('search-x','Nobody by that name.'))}
   paint()};
  inp.oninput=()=>{filt=inp.value.slice(0,40);fill()};
  L.append(s,seg(['Rooms','People'],xs,j=>{xs=j;inp.placeholder=j?'Search people':'Search rooms';fill()}),body);fill();
 }else if(tab==='chats'){
  L.append(el('p','lab','Online now'));const st=el('div','live');
  ONL.filter(n=>n!==ME.u).forEach(n=>{const b=el('button','st press');const rg=el('div','ring');rg.append(av(n,54));rg.firstChild.classList.remove('on');b.append(rg,el('span','',n.length>8?n.slice(0,7)+'…':n));b.onclick=()=>dmTo(n);st.append(b)});
  const body=el('div');
  const fill=()=>{body.replaceChildren();const rows=cs===2?[]:D.filter(d=>cs===0||d.u>0);
   if(!rows.length){body.append(emp(cs===2?'inbox':'check-check',cs===2?'No requests. All clear.':'No chats yet. Say hi to someone.'));return paint()}
   rows.forEach((d,j)=>{const c=el('button','card row press');c.style.setProperty('--i',j);const tx=el('div','tx');const ds=el('div','ds',d.l);if(d.u){ds.style.cssText='color:#fff;font-weight:600'}tx.append(el('div','nm',d.p),ds);
    const m=el('div','meta',d.t);if(d.u){m.style.color='var(--hot)';m.append(el('span','badge',d.u))}c.append(av(d.p,52),tx,m);c.onclick=()=>{d.u=0;open('dm',d.p);fill()};body.append(c)});paint()};
  L.append(st,seg(['All','Unread','Requests'],cs,j=>{cs=j;fill()}),body);fill();
 }else{
  const ban=el('div','ban');[['crown-simple',40,'left:14%;top:calc(34px + env(safe-area-inset-top));transform:rotate(-14deg)'],['flame',46,'right:16%;top:calc(30px + env(safe-area-inset-top));transform:rotate(10deg)']].forEach(([n,z,c])=>{const sp=el('span');sp.style.cssText=c;sp.append(ph(n,z,1));ban.append(sp)});
  const a=el('div','av on big');a.style.setProperty('--c',colorFor(ME.u));a.textContent=ME.u[0].toUpperCase();
  const set=(icn,t,sub,sw,bad)=>{const r=el('button','set press'+(bad?' bad':''));const tx=el('div','tx');tx.append(el('div','nm',t));if(sub)tx.append(el('div','ds',sub));r.append(ic(icn,20),tx);
   if(sw){r.setAttribute('role','switch');r.setAttribute('aria-checked','false');r.append(el('span','sw'));r.onclick=()=>r.setAttribute('aria-checked',r.getAttribute('aria-checked')!=='true')}else if(!bad)r.append(ic('chevron-right',18));return r};
  const tags=el('div','tags');[[ME.guest?'user':'badge-check',ME.guest?'Guest':'Member']].forEach(([i,t])=>{const x=el('span');x.append(ic(i,14),t);tags.append(x)});
  const acts=el('div','acts');const eb=el('button','btn press');eb.append(ph('pencil-simple',20,1),'Edit profile');const sb=el('button','ib press');sb.style.background='var(--s1)';sb.setAttribute('aria-label','Share profile');sb.append(ph('share-network',22,1));acts.append(eb,sb);
  const st=el('div','stats');[[String(R.length),'Rooms'],[String(D.length),'Chats'],[String(ONL.length),'Online']].forEach(([b,x])=>{const d=el('div');d.append(el('b','',b),x);st.append(d)});
  const lv=el('div','live');R.slice(0,4).forEach(r=>{const b=el('button','lt press');const q=el('div','sq');q.style.setProperty('--c',r.c);const w=el('span');w.append(ph(r.i,28,1));q.append(w);b.append(q,el('div','',r.n.split(' ')[0]));b.onclick=()=>open('room',r.id);lv.append(b)});
  const g1=el('div','grp');if(ME.guest){const sv=set('user-plus','Save your account','Pick a username and password');sv.onclick=()=>claimSheet();g1.append(sv)}g1.append(set('shield-check','Privacy','Last seen: people I have chatted with'),set('bell','Notifications','DMs and mentions'),set('signal-low','Low-data mode','Smaller images, no autoplay',1),set('ban','Blocked people'));
  const g2=el('div','grp');const lo=set('log-out','Log out','',0,1);lo.onclick=async()=>{try{await api('/logout',{})}catch(e){}location.reload()};g2.append(lo);
  L.append(ban,a,el('h2','',ME.u),el('p','hd','@'+ME.u),el('p','hand',ME.guest?'Guest account. Save it so you never lose your chats.':'Say hi in a room.'),tags,acts,st,el('p','lab','Your rooms'),lv,el('p','lab','Settings'),g1,g2);
 }
 paint();
}
/* ---------- chat ---------- */
const key=()=>cur.kind+':'+cur.id;
function open(kind,id){cur={kind,id};grp=null;const k=key();store[k]=store[k]||[];renderChat();renderPeople();$('#chat').classList.add('open');
 sock.emit(kind==='room'?'room:join':'dm:open',id,res=>{
  if(!res||res.error){if(cur&&key()===k){cur=null;$('#chat').classList.remove('open');renderChat()}if(res&&res.error==='claim')claimSheet();else toast('Could not open that chat.');return}
  store[k]=res.history.map(norm);if(cur&&key()===k){renderChat();renderPeople()}
  if(kind==='dm'){const d=D.find(x=>x.p===id);if(d)d.u=0}})}
function renderChat(){
 const C=$('#chat');C.replaceChildren();
 if(!cur){const e=el('div','empty'),bg=el('span','big');bg.append(ph('chat-circle',84,1));e.append(bg,el('h3','','Pick a room, say hi.'),el('p','hand',"It's quiet in here. Someone is waiting."));C.append(e);return paint()}
 const room=cur.kind==='room'?R.find(r=>r.id===cur.id):null;
 const h=el('header','ch');const bk=el('button','ib back press');bk.setAttribute('aria-label','Back');bk.append(ic('arrow-left',24));bk.onclick=()=>{C.classList.remove('open');cur=null;sock&&sock.emit('room:leave');if(matchMedia('(min-width:720px)').matches)renderChat()};
 const av=el('div','av'+(room?'':' on'));av.style.setProperty('--w','40px');
 if(room){av.style.setProperty('--c',room.c);av.style.borderRadius='14px';av.append(ph(room.i,20,1))}else{av.style.setProperty('--c',P[cur.id][0]);av.textContent=cur.id[0].toUpperCase()}
 const w=el('div','who');w.append(el('b','',room?room.n:cur.id),el('small','',room?room.on+' people here':(ONL.includes(cur.id)?'Online':'Offline')));
 const ub=el('button','ib usersbtn press');ub.setAttribute('aria-label','People here');ub.append(ic('users',22));ub.onclick=()=>$('#people').classList.add('open')||$('#scrim').classList.add('open');
 const fl=el('button','ib press');fl.setAttribute('aria-label','Report or block');fl.append(ic('flag',20));fl.onclick=safety;
 h.append(bk,av,w,ub,fl);
 const M=el('div','msgs');M.id='msgs';M.setAttribute('aria-live','polite');M.append(el('div','sep','Today'));
 (store[key()]||[]).forEach((m,j,a)=>M.append(bubble(m,a[j-1])));
 const cs=el('div','chips');cs.id='chips';
 const cp=el('form','comp');const em=el('button','ib press');em.type='button';em.setAttribute('aria-label','Emoji');em.append(ic('smile',24));
 const inp=el('input');inp.placeholder='Message';inp.maxLength=1000;inp.autocomplete='off';inp.setAttribute('aria-label','Message');
 const im=el('button','ib press');im.type='button';im.setAttribute('aria-label','Add image');im.append(ic('image',22));
 const go=el('button','go');go.type='submit';go.setAttribute('aria-label','Send');go.append(ph('arrow-up',22,1));
 inp.oninput=()=>go.classList.toggle('on',!!inp.value.trim());
 cp.onsubmit=e=>{e.preventDefault();send(inp.value);inp.value='';go.classList.remove('on')};
 const eP=el('div','emo');eP.hidden=true;eP.setAttribute('aria-label','Emoji');
 '😂 😭 🔥 😍 🙌 👍 🙏 😎 🤣 😅 🥹 💯 ❤️ 🎉 👀 🤝 😤 🫡 🍲 ⚽ 🚗 🌧️ 🌙 ✌🏽'.split(' ').forEach(x=>{const b=el('button','press',x);b.type='button';b.onclick=()=>{inp.value=(inp.value+x).slice(0,1000);inp.focus();go.classList.add('on')};eP.append(b)});
 em.onclick=()=>{eP.hidden=!eP.hidden;em.setAttribute('aria-expanded',!eP.hidden)};
 cp.append(em,inp,im,go);C.append(h,M,cs,eP,cp);renderChips();paint();M.scrollTop=M.scrollHeight;
}
function bubble(m,pv){
 const same=pv&&!!pv.me===!!m.me&&pv.w===m.w;const b=el('div','m'+(m.me?' me':'')+(same?' cont':''));
 if(!m.me&&cur.kind==='room'&&!same){const w=el('div','who',m.w);w.style.color=P[m.w]?P[m.w][0]:'#fff';b.append(w)}
 b.append(el('span','b',m.t),el('span','tm',m.tm));return b}
const now=()=>new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
function add(m){const k=key();const arr=store[k]=store[k]||[];const pv=arr[arr.length-1];arr.push(m);const M=$('#msgs');if(M){M.append(bubble(m,pv));M.scrollTop=M.scrollHeight}}
function send(t){t=String(t).trim().slice(0,1000);if(!t||!cur||!sock)return;const k=key(),kind=cur.kind,id=cur.id,cid=Math.random().toString(36).slice(2)+Date.now().toString(36);
 add({me:1,w:ME.u,t,tm:fmt(Date.now()),cid});grp=null;renderChips();
 sock.timeout(8000).emit('msg:send',{kind,id,text:t,cid},(err,res)=>{if(!err&&res&&res.ok)return;
  store[k]=(store[k]||[]).filter(x=>x.cid!==cid);if(cur&&key()===k)renderChat();
  if(res&&res.error==='claim')claimSheet();else toast(res&&res.error==='rate'?'Slow down a little.':'Message not sent. Check your connection.')})}
function renderChips(){
 const C=$('#chips');if(!C)return;C.replaceChildren();
 const chip=(t,f,g)=>{const b=el('button','chip press'+(g?' g':''),t);if(g)b.append(ic('chevron-right',16));b.onclick=f;C.append(b)};
 if(grp){const b=el('button','chip g press');b.append(ic('chevron-left',16),'Back');b.onclick=()=>{grp=null;renderChips()};C.append(b);CH[grp].forEach(t=>chip(t,()=>send(t)))}
 else{const lm=(store[key()]||[]).slice(-1)[0];if(lm&&!lm.me&&/\?\s*$/.test(lm.t))['Yes','Not really','Tell me more'].forEach(t=>chip(t,()=>send(t)));chip('Hi 👋',()=>send('Hi 👋'));chip('How far?',()=>send('How far?'));Object.keys(CH).forEach(g=>chip(g,()=>{grp=g;renderChips()},1))}
 paint()}
function renderPeople(){
 const P2=$('#people');P2.replaceChildren();if(!cur)return;
 const room=cur.kind==='room'?R.find(r=>r.id===cur.id):null;const names=room?room.p:[cur.id,ME.u];
 const cl=el('button','ib press');cl.style.cssText='position:absolute;top:8px;right:8px';cl.setAttribute('aria-label','Close');cl.append(ic('x',20));cl.onclick=closeP;
 P2.append(cl,el('h3','',room?'Here now':'About'));
 names.forEach(n=>{const b=el('button','pp press');const a=el('div','av'+(P[n][1]?' on':''));a.style.cssText=`--c:${P[n][0]};--w:40px`;a.textContent=n[0].toUpperCase();
  const t=el('div');t.append(el('b','',n),el('small','',P[n][1]?'Online':'Away'));b.append(a,t);
  b.onclick=()=>{if(n!==ME.u){closeP();if(!D.find(d=>d.p===n))D.unshift({p:n,l:'Say hi',t:'now',u:0});open('dm',n)}};P2.append(b)});
 paint()}

function toast(t){document.querySelector('.toast')?.remove();const x=el('div','toast glass',t);x.setAttribute('role','status');document.body.append(x);setTimeout(()=>x.remove(),2600)}
const closeSheet=()=>['ssc','sheet'].forEach(i=>document.getElementById(i)?.remove());
function sheet(title,rows){closeSheet();const sc=el('div','ssc');sc.id='ssc';sc.onclick=closeSheet;const sh=el('div','sheet');sh.id='sheet';sh.setAttribute('role','dialog');sh.setAttribute('aria-modal','true');sh.setAttribute('aria-label',title);
 sh.append(el('div','handle'),el('h3','',title));rows.forEach(([i,t,fn,bad])=>{const b=el('button','sr press'+(bad?' bad':''));b.append(ic(i,22),t);b.onclick=()=>{closeSheet();fn&&fn()};sh.append(b)});
 document.body.append(sc,sh);paint();requestAnimationFrame(()=>sh.classList.add('in'));sh.querySelector('button').focus()}
function safety(){if(!cur)return;const dm=cur.kind==='dm',name=dm?cur.id:R.find(r=>r.id===cur.id).n;
 const report=()=>sheet('Why are you reporting?',['Spam or scam','Harassment','Inappropriate images','Something else'].map(t=>['flag',t,()=>{sock.emit('report',{kind:cur&&cur.kind,id:cur&&cur.id,reason:t});toast('Report sent. A moderator will review it.')}]));
 sheet(name,[['flag',dm?'Report this person':'Report this room',report],['bell-off','Mute',()=>toast('Muted. You can undo this in settings.')],
  dm?['ban','Block '+name,()=>{sock.emit('block',cur.id);const k=key();D.splice(0,D.length,...D.filter(d=>d.p!==cur.id));delete store[k];cur=null;$('#chat').classList.remove('open');renderChat();renderList(false);toast('Blocked. They will not be told.')},1]:['log-out','Leave room',()=>{cur=null;$('#chat').classList.remove('open');renderChat();toast('You left the room.')},1],['x','Cancel']])}
const closeP=()=>{$('#people').classList.remove('open');$('#scrim').classList.remove('open')};
$('#scrim').onclick=closeP;addEventListener('keydown',e=>{if(e.key==='Escape'){closeP();closeSheet()}});

/* ---------- intro choreography: splash -> welcome -> app ---------- */
const sp=$('#splash'),wl=$('#welcome');
setTimeout(()=>{sp.classList.add('out');wl.classList.add('show');paint()},RM?100:2300);
setTimeout(()=>sp.remove(),RM?400:3000);

function onMsg(m){const k=m.k,mm=norm(m),arr=store[k]=store[k]||[];if(m.cid&&arr.some(x=>x.cid===m.cid))return;arr.push(mm);
 const isCur=cur&&key()===k;
 if(isCur){const M=$('#msgs');if(M){M.append(bubble(mm,arr[arr.length-2]));M.scrollTop=M.scrollHeight}renderChips()}
 if(k.startsWith('dm:')){const p=k.slice(3);let d=D.find(x=>x.p===p);if(!d){d={p,l:'',t:'',u:0};D.unshift(d)}d.l=m.t;d.t=fmt(m.ts);
  if(!isCur&&!mm.me){d.u++;toast(p+': '+m.t.slice(0,40))}if(tab==='chats')renderList(false)}}
function connect(){if(sock)sock.disconnect();let first;const ready=new Promise((ok,no)=>{first=ok;setTimeout(()=>no(new Error('Could not reach the server.')),8000)});
 sock=io();
 sock.on('connect',()=>{if(cur&&cur.kind==='room')sock.emit('room:join',cur.id,()=>{})});
 sock.on('connect_error',e=>{if(e.message==='auth')toast('Please log in again.')});
 sock.on('rooms',list=>{R=list;document.querySelectorAll('[data-rc]').forEach(e=>{const r=R.find(x=>x.id===e.dataset.rc);if(r)e.textContent=r.on+e.dataset.sf});if(cur&&cur.kind==='room')renderPeople();first()});
 sock.on('online',n=>{ONL=n;Object.keys(P).forEach(x=>P[x][1]=n.includes(x)?1:0);n.forEach(x=>P[x][1]=1)});
 sock.on('msg',onMsg);return ready}
function formSheet(title,note,submit,fn,foot){closeSheet();const sc=el('div','ssc');sc.id='ssc';sc.onclick=closeSheet;const sh=el('form','sheet');sh.id='sheet';sh.noValidate=true;sh.setAttribute('role','dialog');sh.setAttribute('aria-modal','true');sh.setAttribute('aria-label',title);
 const u=el('input','fi');u.placeholder='Username';u.autocomplete='username';u.maxLength=20;u.setAttribute('aria-label','Username');u.autocapitalize='none';
 const p=el('input','fi');p.type='password';p.placeholder='Password (8+ characters)';p.autocomplete=submit==='Log in'?'current-password':'new-password';p.maxLength=128;p.setAttribute('aria-label','Password');
 const er=el('p','err');er.setAttribute('role','alert');const b=el('button','btn press',submit);b.type='submit';
 sh.append(el('div','handle'),el('h3','',title),el('p','hand',note),u,p,er,b);if(foot)sh.append(foot);
 sh.onsubmit=async e=>{e.preventDefault();er.textContent='';b.disabled=true;try{await fn(u.value.trim(),p.value);closeSheet()}catch(x){er.textContent=x.message}b.disabled=false};
 document.body.append(sc,sh);requestAnimationFrame(()=>sh.classList.add('in'));u.focus()}
const swap=(t,fn)=>{const f=el('button','sr press',t);f.type='button';f.style.justifyContent='center';f.onclick=fn;return f};
function claimSheet(){formSheet('Save your account','Pick a username. No email needed.','Save account',async(u,p)=>{await api('/signup',{username:u,password:p});await afterAuth()},swap('I already have an account',loginSheet))}
function loginSheet(){formSheet('Log in','Welcome back.','Log in',async(u,p)=>{await api('/login',{username:u,password:p});await afterAuth()},swap('New here? Create an account',claimSheet))}
async function afterAuth(){const j=await api('/me');setMe(j.user);if(document.getElementById('welcome')){await enter()}else{await connect();cur=null;renderList(false);renderChat();toast('You are in as '+ME.u)}}
let entering=false;
async function enter(){if(entering)return;entering=true;
 try{if(!ME.u){const j=await api('/guest',{});setMe(j.user)}await connect()}catch(e){entering=false;toast(e.message||'Could not connect');return}
 wl.style.transition='opacity .4s';wl.style.opacity=0;wl.style.pointerEvents='none';$('#app').classList.add('ready');renderList(false);renderChat();paint();setTimeout(()=>wl.remove(),450)}
$('#start').onclick=enter;$('#cont').onclick=enter;$('#login').onclick=loginSheet;
(async()=>{try{const j=await api('/me');setMe(j.user);const c=$('#cont');c.hidden=false;$('#cname').textContent=ME.u;$('#cav').textContent=ME.u[0].toUpperCase();$('#cav').style.setProperty('--c',colorFor(ME.u));$('#login').hidden=true}catch(e){}paint()})();
})();
