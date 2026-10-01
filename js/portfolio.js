import { blogPosts } from './blog-posts/index.js';
import { copy } from './portfolio-i18n.js';

const drawings = [
  ['abKmvRx', 'Kurt Cobain', 'Kurt.mp4'],
  ['dyEpmMG', 'Ana de Armas', 'Ana.mp4'],
  ['rNdgPQe', 'Wall-E & Eve', 'Wall-E.mp4'],
  ['ExELzbN', 'Freddie Mercury', 'Freddie.mp4'],
  ['mdxWQvJ', 'Samurai Jack', 'samuraiJack.mp4'],
  ['KKoMzYe', 'PowerPuff Girls Bubbles', 'bubbles.mp4']
];

const orderedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
const drawingsGrid = document.getElementById('drawings-grid');
const drawingDialog = document.getElementById('drawing-video-dialog');
const drawingDialogVideo = document.getElementById('drawing-dialog-video');
const writingList = document.getElementById('writing-list');
let language = readLanguage();
let activePreview = null;
const hoverPreview = matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

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
  drawingsGrid.querySelectorAll('.drawing-item').forEach(card => {
    card.querySelectorAll('.drawing-codepen-link').forEach(link => {
      link.setAttribute('aria-label', language === 'en' ? `Open ${card.dataset.title} CSS art on CodePen` : `${card.dataset.title} CSS çizimini CodePen'de aç`);
    });
    updatePreviewButton(card);
    card.querySelector('.drawing-full-button').setAttribute('aria-label', `${copy[language]['drawings.fullVideo']}: ${card.dataset.title}`);
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

function updatePreviewButton(card) {
  const button = card.querySelector('.drawing-preview-button');
  const playing = activePreview === card;
  button.textContent = copy[language][playing ? 'drawings.stopPreview' : 'drawings.preview'];
  button.setAttribute('aria-pressed', String(playing));
  button.setAttribute('aria-label', `${button.textContent}: ${card.dataset.title}`);
}

function stopPreview() {
  if (!activePreview) return;
  const card = activePreview;
  activePreview = null;
  const video = card.querySelector('.drawing-preview-video');
  video.pause();
  if (video.readyState) video.currentTime = 0;
  card.classList.remove('is-previewing');
  updatePreviewButton(card);
}

function startPreview(card) {
  if (activePreview === card) return;
  stopPreview();
  const video = card.querySelector('.drawing-preview-video');
  video.muted = true;
  activePreview = card;
  updatePreviewButton(card);
  video.play().catch(() => {
    if (activePreview === card) stopPreview();
  });
}

function openDrawingVideo(card) {
  stopPreview();
  drawingDialog.querySelector('#drawing-dialog-title').textContent = card.dataset.title;
  drawingDialogVideo.src = card.dataset.video;
  drawingDialogVideo.muted = false;
  drawingDialog.showModal();
  drawingDialogVideo.play().catch(() => {});
}

drawings.forEach(([id, title, filename]) => {
  const card = element('article', 'drawing-item');
  card.dataset.title = title;
  card.dataset.video = `videos/${filename}`;
  const imageWrap = element('div', 'drawing-image');
  const mediaLink = element('a', 'drawing-codepen-link drawing-media-link');
  mediaLink.href = `https://codepen.io/yusufyilmaz_/pen/${id}`;
  mediaLink.target = '_blank';
  mediaLink.rel = 'noopener noreferrer';
  const image = element('img');
  image.src = `https://shots.codepen.io/yusufyilmaz_/pen/${id}-800.jpg`;
  image.alt = `${title} CSS art`;
  image.loading = 'lazy';
  const preview = element('video', 'drawing-preview-video');
  preview.src = card.dataset.video;
  preview.muted = true;
  preview.loop = true;
  preview.playsInline = true;
  preview.preload = 'none';
  preview.setAttribute('aria-hidden', 'true');
  preview.addEventListener('playing', () => {
    if (activePreview === card) card.classList.add('is-previewing');
  });
  mediaLink.append(image, preview);
  const actions = element('div', 'drawing-actions');
  const previewButton = element('button', 'drawing-preview-button');
  previewButton.type = 'button';
  previewButton.addEventListener('click', () => activePreview === card ? stopPreview() : startPreview(card));
  const fullButton = element('button', 'drawing-full-button');
  fullButton.type = 'button';
  fullButton.dataset.i18n = 'drawings.fullVideo';
  fullButton.textContent = copy.en['drawings.fullVideo'];
  fullButton.addEventListener('click', () => openDrawingVideo(card));
  actions.append(previewButton, fullButton);
  imageWrap.append(mediaLink, actions);
  imageWrap.addEventListener('pointerenter', () => {
    if (hoverPreview.matches && !reducedMotion.matches) startPreview(card);
  });
  imageWrap.addEventListener('pointerleave', () => {
    if (hoverPreview.matches && activePreview === card) stopPreview();
  });
  const caption = element('a', 'drawing-caption drawing-codepen-link');
  caption.href = mediaLink.href;
  caption.target = '_blank';
  caption.rel = 'noopener noreferrer';
  caption.append(element('span', '', title), element('span', '', '↗'));
  card.append(imageWrap, caption);
  drawingsGrid.append(card);
});

drawingDialog.querySelector('.drawing-dialog-close').addEventListener('click', () => drawingDialog.close());
drawingDialog.addEventListener('click', event => {
  if (event.target === drawingDialog) drawingDialog.close();
});
drawingDialog.addEventListener('close', () => {
  drawingDialogVideo.pause();
  drawingDialogVideo.removeAttribute('src');
  drawingDialogVideo.load();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopPreview();
    drawingDialogVideo.pause();
  }
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
