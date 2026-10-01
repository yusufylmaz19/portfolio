import { blogPosts } from './blog-posts/index.js';
import { copy } from './portfolio-i18n.js';

const drawings = [
  ['abKmvRx', 'Kurt Cobain'],
  ['dyEpmMG', 'Ana de Armas'],
  ['rNdgPQe', 'Wall-E & Eve'],
  ['ExELzbN', 'Freddie Mercury'],
  ['mdxWQvJ', 'Samurai Jack'],
  ['KKoMzYe', 'PowerPuff Girls Bubbles']
];

const orderedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
const drawingsGrid = document.getElementById('drawings-grid');
const writingList = document.getElementById('writing-list');
let language = readLanguage();

function readLanguage() {
  try { return localStorage.getItem('language') === 'tr' ? 'tr' : 'en'; }
  catch { return 'en'; }
}

function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}

function translatePage() {
  const strings = copy[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    node.textContent = strings[node.dataset.i18n] ?? node.textContent;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(node => {
    node.innerHTML = strings[node.dataset.i18nHtml] ?? node.innerHTML;
  });
  document.querySelector('meta[name="description"]')?.setAttribute('content', strings['meta.description']);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', strings['meta.ogDescription']);
  document.querySelector('.wordmark')?.setAttribute('aria-label', language === 'en' ? 'Yusuf Yılmaz, back to top' : 'Yusuf Yılmaz, sayfanın başı');
  document.querySelector('.site-nav')?.setAttribute('aria-label', language === 'en' ? 'Main navigation' : 'Ana menü');
  document.querySelector('.experience-list')?.setAttribute('aria-label', language === 'en' ? 'Experience' : 'Deneyim');
  drawingsGrid.querySelectorAll('.drawing-item').forEach(link => {
    link.setAttribute('aria-label', language === 'en' ? `${link.dataset.title} CSS art on CodePen` : `${link.dataset.title} CSS çizimini CodePen'de aç`);
  });
  document.querySelectorAll('.language-switch button').forEach(button => {
    const selected = button.dataset.lang === language;
    button.setAttribute('aria-pressed', String(selected));
    button.setAttribute('aria-label', button.dataset.lang === 'en' ? 'Switch to English' : 'Türkçeye geç');
  });
  const intro = document.getElementById('writing-intro');
  intro.textContent = strings['writing.intro'].replace('{count}', String(orderedPosts.length));
}

function setLanguage(next) {
  if (next !== 'en' && next !== 'tr') return;
  if (next !== language) {
    language = next;
    try { localStorage.setItem('language', next); } catch { /* A browser may disable storage. */ }
  }
  translatePage();
  renderWriting();
}

document.querySelectorAll('.language-switch button').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

drawings.forEach(([id, title]) => {
  const link = element('a', 'drawing-item');
  link.href = `https://codepen.io/yusufyilmaz_/pen/${id}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.dataset.title = title;
  link.setAttribute('aria-label', `${title} CSS art on CodePen`);
  const imageWrap = element('div', 'drawing-image');
  const image = element('img');
  image.src = `https://shots.codepen.io/yusufyilmaz_/pen/${id}-800.jpg`;
  image.alt = `${title} CSS art`;
  image.loading = 'lazy';
  imageWrap.append(image);
  const caption = element('div', 'drawing-caption');
  caption.append(element('span', '', title), element('span', '', '↗'));
  link.append(imageWrap, caption);
  drawingsGrid.append(link);
});

function showContent(post, container) {
  const markdown = post.content[language] || post.content.en;
  if (window.marked) {
    container.innerHTML = window.marked.parse(markdown);
    container.querySelectorAll('img').forEach(img => {
      if (img.getAttribute('src')?.endsWith('.mp4')) {
        const video = element('video');
        video.controls = true;
        video.playsInline = true;
        video.preload = 'none';
        video.src = img.getAttribute('src');
        video.setAttribute('aria-label', img.alt || 'Article video');
        img.replaceWith(video);
      } else {
        img.loading = 'lazy';
      }
    });
    container.querySelectorAll('a').forEach(link => {
      if (link.href.startsWith('http')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  } else {
    container.replaceChildren(element('div', 'markdown-fallback', markdown));
  }
}

function renderWriting() {
  const openIds = new Set([...writingList.querySelectorAll('details[open]')].map(item => item.id));
  const hashId = /^#post-\d+$/.test(location.hash) ? location.hash.slice(1) : null;
  writingList.replaceChildren();
  orderedPosts.forEach((post, index) => {
    const details = element('details', 'writing-item');
    details.id = `post-${post.id}`;
    const summary = element('summary');
    const number = element('span', 'writing-number', String(index + 1).padStart(2, '0'));
    const title = element('span', 'writing-title', post.title[language] || post.title.en);
    const dateText = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'tr-TR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${post.date}T00:00:00Z`));
    const date = element('span', 'writing-date', `${dateText} · ${post.readTime} ${copy[language]['writing.readTime']}`);
    const toggle = element('span', 'writing-toggle', '+');
    toggle.setAttribute('aria-hidden', 'true');
    summary.append(number, title, date, toggle);
    const excerpt = element('p', 'writing-excerpt', post.excerpt[language] || post.excerpt.en);
    const content = element('div', 'article-content');
    details.append(summary, excerpt);
    if (post.sourceUrl) {
      const sourceLabel = new URL(post.sourceUrl).hostname.endsWith('npmjs.com') ? 'writing.sourceNpm' : 'writing.sourceGeneric';
      const source = element('a', 'writing-source', copy[language][sourceLabel]);
      source.href = post.sourceUrl;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      details.append(source);
    }
    details.append(content);
    details.addEventListener('toggle', () => {
      if (details.open && !content.dataset.loaded) {
        showContent(post, content);
        content.dataset.loaded = 'true';
      }
    });
    writingList.append(details);
    if (openIds.has(details.id) || hashId === details.id) {
      details.open = true;
      showContent(post, content);
      content.dataset.loaded = 'true';
    }
  });
}

function openHashPost() {
  if (!/^#post-\d+$/.test(location.hash)) return;
  const target = document.getElementById(location.hash.slice(1));
  if (target) {
    target.open = true;
    target.scrollIntoView({ block: 'start' });
  }
}

window.addEventListener('hashchange', openHashPost);
translatePage();
renderWriting();
if (location.hash.startsWith('#post-')) requestAnimationFrame(openHashPost);
