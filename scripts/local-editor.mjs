import http from 'node:http';
import { readFile, readdir, stat, writeFile, rename, rm } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = resolve(process.env.PORTFOLIO_ROOT || defaultRoot);
const postDir = resolve(siteRoot, 'js/blog-posts');
const port = Number(process.env.PORTFOLIO_EDITOR_PORT || 4173);
const token = randomBytes(24).toString('hex');
const previousToken = process.env.PORTFOLIO_EDITOR_PREVIOUS_TOKEN;
const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4'
};
let saveQueue = Promise.resolve();

function json(response, status, value) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  response.end(JSON.stringify(value));
}

function reject(response, status, message) { json(response, status, { error: message }); }

async function postFiles() {
  return (await readdir(postDir)).filter(name => /^post-[1-9]\d*\.js$/.test(name)).sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
}

async function readPosts() {
  const files = await postFiles();
  const posts = [];
  for (const file of files) {
    const fullPath = resolve(postDir, file);
    const info = await stat(fullPath);
    const id = Number(file.match(/\d+/)[0]);
    const module = await import(`${pathToFileURL(fullPath).href}?modified=${info.mtimeMs}`);
    const post = module[`post${id}`];
    if (!post || post.id !== id) throw new Error(`Invalid post module: ${file}`);
    posts.push(post);
  }
  return posts;
}

function requiredText(value, label, limit) {
  if (typeof value !== 'string' || !value.trim() || value.length > limit) throw new Error(`${label} must be 1–${limit} characters.`);
  return value.trim();
}

function validate(input, id) {
  if (!input || typeof input !== 'object') throw new Error('Invalid post.');
  const date = requiredText(input.date, 'Date', 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(`${date}T00:00:00Z`)) || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) throw new Error('Date must use a real YYYY-MM-DD date.');
  const readTime = String(input.readTime ?? '').trim();
  if (!/^[1-9]\d{0,2}$/.test(readTime)) throw new Error('Reading time must be a positive number of minutes.');
  const sourceUrl = typeof input.sourceUrl === 'string' ? input.sourceUrl.trim() : '';
  if (sourceUrl) {
    let parsed;
    try { parsed = new URL(sourceUrl); } catch { throw new Error('Source URL is invalid.'); }
    if (!['https:', 'http:'].includes(parsed.protocol) || sourceUrl.length > 500) throw new Error('Source URL must be an HTTP(S) link.');
  }
  const post = { id, title: {}, excerpt: {}, date, readTime, sourceUrl, content: {} };
  for (const lang of ['en', 'tr']) {
    post.title[lang] = requiredText(input.title?.[lang], `${lang.toUpperCase()} title`, 200);
    post.excerpt[lang] = requiredText(input.excerpt?.[lang], `${lang.toUpperCase()} summary`, 1000);
    post.content[lang] = requiredText(input.content?.[lang], `${lang.toUpperCase()} content`, 1_000_000);
  }
  return post;
}

async function atomicWrite(filename, data) {
  const temp = `${filename}.${randomBytes(6).toString('hex')}.tmp`;
  try {
    await writeFile(temp, data, { flag: 'wx' });
    await rename(temp, filename);
  } finally {
    await rm(temp, { force: true });
  }
}

async function savePost(input) {
  const posts = await readPosts();
  const ids = posts.map(post => post.id);
  const requestedId = input?.id;
  if (requestedId !== null && requestedId !== undefined && (!Number.isInteger(requestedId) || !ids.includes(requestedId))) {
    throw new Error('Post does not exist.');
  }
  const id = requestedId ?? (Math.max(0, ...ids) + 1);
  const post = validate(input, id);
  await atomicWrite(resolve(postDir, `post-${id}.js`), `export const post${id} = ${JSON.stringify(post, null, 2)};\n`);
  const updatedIds = [...new Set([...ids, id])].sort((a, b) => a - b);
  const imports = updatedIds.map(number => `import { post${number} } from './post-${number}.js';`).join('\n');
  const registry = `${imports}\n\nexport const blogPosts = [\n${updatedIds.map(number => `  post${number}`).join(',\n')}\n];\n`;
  await atomicWrite(resolve(postDir, 'index.js'), registry);
  return post;
}

async function readBody(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 3_000_000) throw new Error('Post is too large.');
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new Error('Invalid JSON.'); }
}

async function serveStatic(pathname, response) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return reject(response, 400, 'Invalid path.'); }
  if (decoded === '/') decoded = '/index.html';
  const parts = decoded.split('/').filter(Boolean);
  if (parts.some(part => part.startsWith('.')) || parts[0] === 'scripts') return reject(response, 404, 'Not found.');
  const filename = resolve(siteRoot, `.${decoded}`);
  if (!filename.startsWith(`${siteRoot}${sep}`) || !contentTypes[extname(filename)]) return reject(response, 404, 'Not found.');
  try {
    const data = await readFile(filename);
    response.writeHead(200, { 'Content-Type': contentTypes[extname(filename)], 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
    response.end(data);
  } catch { reject(response, 404, 'Not found.'); }
}

const editorPage = `<!doctype html>
<html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/images/editor-favicon.svg"><title>Yazı editörü · Yusuf Yılmaz</title>
<style>
:root{--paper:#f1f0e7;--blue:#214d91;--pink:#dd3377}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--blue);font:16px system-ui,sans-serif}button,input,textarea{font:inherit}button{cursor:pointer}a{color:inherit}header{padding:22px clamp(20px,4vw,60px);border-bottom:1px solid var(--blue);display:flex;justify-content:space-between;align-items:center;gap:20px}h1,h2,h3,p{margin:0}h1{font-size:28px;letter-spacing:-.05em}header p{font-size:12px;margin-top:5px}header a{font-size:13px}.shell{display:grid;grid-template-columns:minmax(220px,300px) 1fr;min-height:calc(100vh - 91px)}aside{border-right:1px solid var(--blue);padding:26px 20px}aside>button{width:100%;padding:12px;background:var(--pink);color:var(--paper);border:0;font-weight:700}.list{margin-top:28px}.post-button{display:block;width:100%;text-align:left;border:0;border-bottom:1px solid #214d9144;background:none;color:var(--blue);padding:15px 5px}.post-button.active{color:var(--pink);font-weight:700}.post-button small{display:block;margin-top:4px;font-size:11px;font-weight:400}main{padding:30px clamp(20px,4vw,65px) 80px;max-width:1100px;width:100%}.topline{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:26px}h2{font-size:40px;letter-spacing:-.065em}.status{font-size:13px;min-height:22px}.status.error{color:var(--pink)}.meta{display:grid;grid-template-columns:1fr 1fr 2fr;gap:14px;margin:30px 0}label{display:block;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}input,textarea{display:block;width:100%;background:transparent;color:var(--blue);border:1px solid var(--blue);border-radius:0;padding:11px;margin-top:7px;outline:none}input:focus,textarea:focus{border-color:var(--pink);box-shadow:inset 0 0 0 1px var(--pink)}textarea{resize:vertical;min-height:110px;line-height:1.45}.content-field textarea{min-height:430px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:14px}.lang-tabs{display:flex;gap:0;margin:18px 0 25px}.lang-tabs button{border:1px solid var(--blue);background:transparent;color:var(--blue);padding:10px 18px;font-weight:700}.lang-tabs button+button{border-left:0}.lang-tabs button.active{background:var(--blue);color:var(--paper)}.language-fields{display:none}.language-fields.active{display:block}.language-fields label{margin:0 0 18px}.actions{display:flex;align-items:center;gap:18px;margin-top:25px;flex-wrap:wrap}.save{background:var(--blue);color:var(--paper);border:0;padding:13px 24px;font-weight:700}.save:disabled{opacity:.5;cursor:wait}.hint{font-size:13px;line-height:1.5}#preview-link[hidden]{display:none}@media(max-width:740px){.shell{display:block}aside{border-right:0;border-bottom:1px solid var(--blue)}.list{display:flex;gap:10px;overflow:auto;margin-top:16px}.post-button{min-width:175px;border:1px solid #214d9144;padding:10px}.meta{grid-template-columns:1fr 1fr}.meta label:last-child{grid-column:1/-1}h2{font-size:32px}}
</style></head><body>
<header><div><h1>Yazı editörü<span style="color:var(--pink)">.</span></h1><p>Yalnızca bu bilgisayarda çalışır · Değişiklikler blog dosyalarına kaydedilir</p></div><a href="/index.html#writing" target="_blank" rel="noopener noreferrer">Siteyi aç ↗</a></header>
<div class="shell"><aside><button type="button" id="new-post">+ Yeni yazı</button><div class="list" id="post-list"></div></aside>
<main><div class="topline"><h2 id="form-title">Yazı seç</h2><span class="status" id="status" role="status"></span></div>
<form id="post-form" novalidate><div class="meta"><label>Tarih<input name="date" type="date" required></label><label>Okuma süresi (dk)<input name="readTime" type="number" min="1" max="999" required></label><label>Kaynak bağlantısı (isteğe bağlı)<input name="sourceUrl" type="url" placeholder="https://..."></label></div>
<div class="lang-tabs" role="group" aria-label="Yazı dili"><button type="button" data-lang="en" class="active" aria-pressed="true">English</button><button type="button" data-lang="tr" aria-pressed="false">Türkçe</button></div>
<div class="language-fields active" data-panel="en"><label>English title<input name="title_en" maxlength="200" required></label><label>English summary<textarea name="excerpt_en" maxlength="1000" required></textarea></label><label class="content-field">English article · Markdown<textarea name="content_en" required></textarea></label></div>
<div class="language-fields" data-panel="tr"><label>Türkçe başlık<input name="title_tr" maxlength="200" required></label><label>Türkçe özet<textarea name="excerpt_tr" maxlength="1000" required></textarea></label><label class="content-field">Türkçe yazı · Markdown<textarea name="content_tr" required></textarea></label></div>
<div class="actions"><button class="save" type="submit">Kaydet</button><a id="preview-link" hidden target="_blank" rel="noopener noreferrer">Yazıyı sitede gör ↗</a><span class="hint">İki dilin başlık, özet ve yazı alanları gerekli. Kaydettikten sonra Git commit/push ile yayına al.</span></div></form></main></div>
<script>
let csrf = '${token}';
const form = document.getElementById('post-form');
const list = document.getElementById('post-list');
const status = document.getElementById('status');
const preview = document.getElementById('preview-link');
let posts = [], selectedId = null, dirty = false;
function message(text, error=false){status.textContent=text;status.classList.toggle('error',error)}
function field(name){return form.elements.namedItem(name)}
function setLanguage(lang){document.querySelectorAll('[data-panel]').forEach(el=>el.classList.toggle('active',el.dataset.panel===lang));document.querySelectorAll('.lang-tabs button').forEach(btn=>{const active=btn.dataset.lang===lang;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))})}
document.querySelectorAll('.lang-tabs button').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
function canLeave(){return !dirty || confirm('Kaydedilmemiş değişiklikler var. Devam edilsin mi?')}
function renderList(){list.replaceChildren();posts.sort((a,b)=>b.date.localeCompare(a.date));posts.forEach(post=>{const btn=document.createElement('button');btn.type='button';btn.className='post-button'+(post.id===selectedId?' active':'');btn.textContent=post.title.en;const small=document.createElement('small');small.textContent=post.date+' · #'+post.id;btn.append(small);btn.addEventListener('click',()=>{if(canLeave())select(post)});list.append(btn)})}
function select(post){selectedId=post?.id??null;form.reset();const data=post||{date:new Date().toLocaleDateString('en-CA'),readTime:'3',sourceUrl:'',title:{en:'',tr:''},excerpt:{en:'',tr:''},content:{en:'',tr:''}};for(const key of ['date','readTime','sourceUrl'])field(key).value=data[key]||'';for(const lang of ['en','tr'])for(const key of ['title','excerpt','content'])field(key+'_'+lang).value=data[key]?.[lang]||'';document.getElementById('form-title').textContent=post?'Yazıyı düzenle':'Yeni yazı';preview.hidden=!post;preview.href=post?'/index.html#post-'+post.id:'';dirty=false;message('');renderList()}
form.addEventListener('input',()=>{dirty=true;message('Kaydedilmemiş değişiklikler')});
document.getElementById('new-post').addEventListener('click',()=>{if(canLeave())select(null)});
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue=''}});
async function saveRequest(payload){
  const send=()=>fetch('/__editor/api/posts',{method:'POST',headers:{'Content-Type':'application/json','X-Editor-Token':csrf},body:JSON.stringify(payload)});
  let response=await send();
  if(response.status===403){
    const refresh=await fetch('/__editor/api/token',{cache:'no-store'});
    if(refresh.ok){csrf=(await refresh.json()).token;response=await send()}
  }
  return response;
}
form.addEventListener('submit',async event=>{event.preventDefault();for(const control of form.querySelectorAll('[required]')){if(!control.checkValidity()){const panel=control.closest('[data-panel]');if(panel)setLanguage(panel.dataset.panel);control.reportValidity();return}}const payload={id:selectedId,date:field('date').value,readTime:field('readTime').value,sourceUrl:field('sourceUrl').value,title:{en:field('title_en').value,tr:field('title_tr').value},excerpt:{en:field('excerpt_en').value,tr:field('excerpt_tr').value},content:{en:field('content_en').value,tr:field('content_tr').value}};const button=form.querySelector('.save');button.disabled=true;message('Kaydediliyor…');try{const response=await saveRequest(payload);const result=await response.json();if(!response.ok)throw new Error(result.error||'Kaydedilemedi');dirty=false;posts=await loadPosts();select(result.post);message('Kaydedildi · Değişiklikleri Git ile yayımlayabilirsin')}catch(error){message(error.message,true)}finally{button.disabled=false}});
async function loadPosts(){const response=await fetch('/__editor/api/posts',{cache:'no-store'});if(!response.ok)throw new Error('Yazılar okunamadı');return (await response.json()).posts}
loadPosts().then(items=>{posts=items;renderList();select(items[0]||null)}).catch(error=>message(error.message,true));
</script></body></html>`;

const server = http.createServer(async (request, response) => {
  const host = request.headers.host;
  if (host !== `127.0.0.1:${port}` && host !== `localhost:${port}`) return reject(response, 403, 'Local access only.');
  const origin = request.headers.origin;
  if (origin && origin !== `http://${host}`) return reject(response, 403, 'Invalid origin.');
  let pathname;
  try { pathname = new URL(request.url, `http://${host}`).pathname; }
  catch { return reject(response, 400, 'Invalid URL.'); }
  try {
    if (pathname === '/__editor') {
      if (request.method !== 'GET') return reject(response, 405, 'Method not allowed.');
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      return response.end(editorPage);
    }
    if (pathname === '/__editor/api/token') {
      if (request.method !== 'GET') return reject(response, 405, 'Method not allowed.');
      return json(response, 200, { token });
    }
    if (pathname === '/__editor/api/posts') {
      if (request.method === 'GET') return json(response, 200, { posts: await readPosts() });
      if (request.method !== 'POST') return reject(response, 405, 'Method not allowed.');
      const submittedToken = request.headers['x-editor-token'];
      if ((submittedToken !== token && (!previousToken || submittedToken !== previousToken)) || !request.headers['content-type']?.startsWith('application/json')) return reject(response, 403, 'Editor token required.');
      const input = await readBody(request);
      const work = saveQueue.then(() => savePost(input));
      saveQueue = work.catch(() => {});
      return json(response, 200, { post: await work });
    }
    if (request.method !== 'GET') return reject(response, 405, 'Method not allowed.');
    await serveStatic(pathname, response);
  } catch (error) {
    reject(response, error.message === 'Post is too large.' ? 413 : 400, error.message || 'Editor error.');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio editor: http://127.0.0.1:${port}/__editor`);
  console.log('Press Ctrl+C to stop.');
});
