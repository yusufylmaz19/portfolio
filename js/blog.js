import { blogPosts } from './blog-posts/index.js';

// Render blog cards on blog.html
function renderBlogCards() {
  const container = document.getElementById('blog-container');
  if (!container) return;

  const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'tr';
  console.log(currentLang);
  const readMoreText = (window.getTranslation && window.getTranslation('blog_page.read_more', currentLang)) || 'Devamını Oku →';
  const readTimeUnit = (window.getTranslation && window.getTranslation('blog_page.reading_time_unit', currentLang)) || 'dk';
  const readTimeSuffix = (window.getTranslation && window.getTranslation('blog_page.reading_time_suffix', currentLang)) || 'okuma';

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const html = sortedPosts.map(post => `
    <article class="card fade-in">
      <h3 class="card-title">${post.title[currentLang]}</h3>
      <div class="card-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.readTime} ${readTimeUnit} ${readTimeSuffix}</span>
      </div>
      <p class="card-description">${post.excerpt[currentLang]}</p>
      <a href="blog-${post.id}.html" class="btn btn-secondary mt-md" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;">
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
  const readTimeUnit = (window.getTranslation && window.getTranslation('blog_page.reading_time_unit', currentLang)) || 'dk';
  const readTimeSuffix = (window.getTranslation && window.getTranslation('blog_page.reading_time_suffix', currentLang)) || 'okuma';

  const featured = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  const html = featured.map(post => `
    <article class="card">
      <h3 class="card-title">${post.title[currentLang]}</h3>
      <div class="card-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.readTime} ${readTimeUnit} ${readTimeSuffix}</span>
      </div>
      <p class="card-description">${post.excerpt[currentLang]}</p>
      <a href="blog-${post.id}.html" class="btn btn-secondary mt-md" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;">
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
  const readTimeUnit = (window.getTranslation && window.getTranslation('blog_page.reading_time_unit', currentLang)) || 'dk';
  const readTimeSuffix = (window.getTranslation && window.getTranslation('blog_page.reading_time_suffix', currentLang)) || 'okuma';

  // Read post ID from meta tag first (for blog-X.html pages), fallback to query param
  const metaPostId = document.querySelector('meta[name="blog-post-id"]');
  let postId;
  if (metaPostId) {
    postId = parseInt(metaPostId.getAttribute('content'));
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    postId = parseInt(urlParams.get('id'));
  }

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

  // --- Markdown to HTML (marked.js) ---
  let rawContent = post.content[currentLang];

  // Parse markdown to HTML using marked.js
  let content;
  if (window.marked) {
    content = window.marked.parse(rawContent);
  } else {
    // Fallback: render as-is (for legacy HTML content)
    content = rawContent;
  }

  // --- Video embed: convert ![Video](*.mp4) img tags to video elements ---
  content = content.replace(
    /<img\s+src="([^"]+\.mp4)"\s+alt="([^"]*)"\s*\/?>/g,
    (match, videoSrc, altText) => `
      <div class="blog-gif-wrapper" style="display: flex; justify-content: center; margin: 24px 0;">
        <video controls loop autoplay muted playsinline style="max-width:100%;border-radius:8px;background:#f4f4f4;">
          <source src="${videoSrc}" type="video/mp4">
          ${gifNotSupported}
        </video>
      </div>
    `
  );

  // --- Legacy HTML video-src support ---
  content = content.replace(
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
        <span>${post.readTime} ${readTimeUnit} ${readTimeSuffix}</span>
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

  // Update meta tags for social sharing
  updateMetaTags(post, currentLang);
}

// Update meta tags for social media previews
function updateMetaTags(post, lang) {
  const title = post.title[lang];
  const description = post.excerpt[lang];
  const url = window.location.href;
  
  // Try to find the first image in markdown content
  const imgRegex = /!\[.*?\]\((.*?)\)/;
  const match = post.content[lang].match(imgRegex);
  let imageUrl = 'https://www.yusufyilmaz.tech/images/favicon.svg'; // Default image
  
  if (match && match[1]) {
    imageUrl = match[1];
    if (!imageUrl.startsWith('http')) {
      imageUrl = 'https://www.yusufyilmaz.tech/' + imageUrl;
    }
  } else {
    imageUrl = 'https://www.yusufyilmaz.tech/images/blog/4/azure.webp'; 
  }

  // Update Page Title
  document.title = `${title} | Yusuf Yılmaz`;

  // Update Open Graph tags
  const ogTitle = document.getElementById('og-title');
  if (ogTitle) ogTitle.setAttribute('content', title);
  
  const ogDescription = document.getElementById('og-description');
  if (ogDescription) ogDescription.setAttribute('content', description);
  
  const ogImage = document.getElementById('og-image');
  if (ogImage) ogImage.setAttribute('content', imageUrl);

  // Update Twitter tags
  const twitterTitle = document.getElementById('twitter-title');
  if (twitterTitle) twitterTitle.setAttribute('content', title);
  
  const twitterDescription = document.getElementById('twitter-description');
  if (twitterDescription) twitterDescription.setAttribute('content', description);
  
  const twitterImage = document.getElementById('twitter-image');
  if (twitterImage) twitterImage.setAttribute('content', imageUrl);
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
