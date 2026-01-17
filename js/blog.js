import { blogPosts } from './blog-posts/index.js';

// Render blog cards on blog.html
function renderBlogCards() {
  const container = document.getElementById('blog-container');
  if (!container) return;

  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'tr';
  console.log(currentLang);
  const readMoreText = (window.getTranslation && window.getTranslation('blog_page.read_more', currentLang)) || 'Devamını Oku →';
  const readTimeSuffix = (window.getTranslation && window.getTranslation('blog_page.reading_time_suffix', currentLang)) || 'okuma';

  const html = blogPosts.map(post => `
    <article class="card fade-in">
      <h3 class="card-title">${post.title[currentLang]}</h3>
      <div class="card-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.readTime} ${readTimeSuffix}</span>
      </div>
      <p class="card-description">${post.excerpt[currentLang]}</p>
      <a href="blog-detail.html?id=${post.id}" class="btn btn-secondary mt-md" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;">
        ${readMoreText}
      </a>
    </article>
  `).join('');

  container.innerHTML = html;

  // Trigger animations
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }, 100);
}

// Render featured blog cards on index.html
function renderFeaturedBlogs() {
  const container = document.getElementById('featured-blogs');
  if (!container) return;

  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'tr';
  const readMoreText = (window.getTranslation && window.getTranslation('featured_blog.btn_continue', currentLang)) || 'Devamını Oku →';
  const readTimeSuffix = (window.getTranslation && window.getTranslation('blog_page.reading_time_suffix', currentLang)) || 'okuma';

  const featured = blogPosts.slice(0, 3);

  const html = featured.map(post => `
    <article class="card">
      <h3 class="card-title">${post.title[currentLang]}</h3>
      <div class="card-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.readTime} ${readTimeSuffix}</span>
      </div>
      <p class="card-description">${post.excerpt[currentLang]}</p>
      <a href="blog-detail.html?id=${post.id}" class="btn btn-secondary mt-md" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;">
        ${readMoreText}
      </a>
    </article>
  `).join('');

  container.innerHTML = html;
}

// Render blog detail on blog-detail.html
function renderBlogDetail() {
  const container = document.getElementById('blog-detail');
  if (!container) return;

  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'tr';
  const notFoundTitle = (window.getTranslation && window.getTranslation('blog_page.not_found_title', currentLang)) || 'Blog yazısı bulunamadı';
  const notFoundDesc = (window.getTranslation && window.getTranslation('blog_page.not_found_desc', currentLang)) || 'Aradığınız içerik mevcut değil.';
  const backBtnText = (window.getTranslation && window.getTranslation('blog_page.back_to_blog', currentLang)) || "Blog'a Dön";
  const gifNotSupported = (window.getTranslation && window.getTranslation('blog_page.gif_not_supported', currentLang)) || "GIF/video desteklenmiyor.";
  const readTimeSuffix = (window.getTranslation && window.getTranslation('blog_page.reading_time_suffix', currentLang)) || 'okuma';

  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'));

  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    container.innerHTML = `
  < div class="text-center" >
        <h2>${notFoundTitle}</h2>
        <p class="mt-md">${notFoundDesc}</p>
        <a href="blog.html" class="btn btn-primary mt-lg">${backBtnText}</a>
      </div >
  `;
    return;
  }

  // --- GIF img'lerini video'ya çevir ---
  let content = post.content[currentLang].replace(
    /<img\s+video-src="([^"]+)"\s+poster-src="([^"]+)"\s*><\/img>/g,
    (match, videoSrc, posterSrc) => `
      <div class="blog-gif-wrapper" style="display: flex; justify-content: center; margin: 24px 0;">
        <video controls loop autoplay muted playsinline poster="${posterSrc}" style="max-width:100%;border-radius:8px;background:#f4f4f4;">
          <source src="${videoSrc}" type="video/mp4">
          ${gifNotSupported}
        </video>
      </div>
    `
  );

  const html = `
    <a href="blog.html" class="back-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      ${backBtnText}
    </a>
    <header class="blog-detail-header">
      <h1>${post.title[currentLang]}</h1>
      <div class="blog-detail-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.readTime} ${readTimeSuffix}</span>
      </div>
    </header>
    <div class="blog-detail-content">
      ${content}
    </div>
`;

  container.innerHTML = html;

  // --- <small> etiketlerini ortala ---
  container.querySelectorAll('.blog-detail-content small').forEach(el => {
    el.style.display = 'block';
    el.style.textAlign = 'center';
    el.style.margin = '16px 0 8px 0';
    el.style.fontSize = '0.95em';
    el.style.color = '#888';
  });
}

// Format date to Turkish or English locale
function formatDate(dateString) {
  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'tr';
  const locale = currentLang === 'en' ? 'en-US' : 'tr-TR';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(locale, options);
}

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', () => {
  renderBlogCards();
  renderFeaturedBlogs();
  renderBlogDetail();
  renderGallery();
});

// Re-render content when language changes
window.addEventListener('languageChanged', () => {
  console.log('Language changed event received');
  renderBlogCards();
  renderFeaturedBlogs();
  renderBlogDetail();
  // renderGallery content is separate from translation logic, but if gallery tags need translation, add here
});

// ========== CSS ART GALLERY ==========

// Gallery Data
const cssArtworks = [
  {
    id: 'abKmvRx',
    title: 'Kurt Cobain',
    tag: 'Pure CSS Art'
  },
  {
    id: 'dyEpmMG',
    title: 'Ana de Armas',
    tag: 'Pure CSS Art'
  },
  {
    id: 'rNdgPQe',
    title: 'Wall-E & Eve',
    tag: 'Pure CSS Art'
  },
  {
    id: 'ExELzbN',
    title: 'Freddie Mercury',
    tag: 'Pure CSS Art'
  },
  {
    id: 'mdxWQvJ',
    title: 'Samurai Jack',
    tag: 'Pure CSS Art'
  },
  {
    id: 'KKoMzYe',
    title: 'PowerPuff Girls Bubbles',
    tag: 'Pure CSS Art'
  },
  // {
  //   id: 'GRxzoKO',
  //   title: 'John Lennon',
  //   tag: 'Pure CSS Art'
  // },
  // {
  //   id: 'BarKWRB',
  //   title: 'The Office Logo',
  //   tag: 'Pure CSS Art'
  // }
];

// Render gallery on index.html
function renderGallery() {
  const container = document.getElementById('css-art-gallery');
  if (!container) return;

  const html = cssArtworks.map(art => `
    <a href="https://codepen.io/yusufyilmaz_/pen/${art.id}" target="_blank" rel="noopener noreferrer" class="gallery-item fade-in">
      <div class="gallery-preview">
        <img src="https://shots.codepen.io/yusufyilmaz_/pen/${art.id}-800.jpg" alt="${art.title} CSS Art" loading="lazy">
      </div>
      <div class="gallery-info">
        <h4 class="gallery-title">${art.title}</h4>
        <span class="gallery-tag">${art.tag}</span>
      </div>
    </a>
  `).join('');

  container.innerHTML = html;

  // Trigger animations
  setTimeout(() => {
    container.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }, 100);
}
