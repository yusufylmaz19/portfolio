// Blog Posts Data
const blogPosts = [
  {
    id: 1,
    title: "Modern React Patterns: Hooks ve Custom Hook'lar",
    excerpt: "React Hooks ile temiz ve yeniden kullanılabilir kod yazmak için en iyi pratikler ve custom hook oluşturma teknikleri.",
    date: "2026-01-15",
    readTime: "8 dk",
    content: `
      <p>React Hooks, fonksiyonel componentlerde state ve lifecycle özelliklerini kullanmamızı sağlayan güçlü bir API'dir. Bu yazıda, modern React uygulamalarında sıkça kullanılan hook pattern'lerini inceleyeceğiz.</p>
      
      <h2>useState ve useEffect Temelleri</h2>
      <p>useState hook'u, fonksiyonel componentlerde local state yönetimi için kullanılır. useEffect ise side effect'leri yönetmek için tercih edilir.</p>
      
      <pre><code>const [count, setCount] = useState(0);

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);</code></pre>
      
      <h2>Custom Hook Oluşturma</h2>
      <p>Custom hook'lar, component logic'ini yeniden kullanılabilir fonksiyonlara çıkarmamızı sağlar. "use" prefix'i ile başlamalıdırlar.</p>
      
      <pre><code>function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}</code></pre>
      
      <h2>Performance Optimizasyonu</h2>
      <p>useMemo ve useCallback hook'ları, gereksiz render'ları önlemek için kritik öneme sahiptir. Expensive hesaplamaları memoize etmek performansı önemli ölçüde artırır.</p>
    `
  },
  {
    id: 2,
    title: "Next.js 14 ile Server Components Rehberi",
    excerpt: "Server Components nedir, nasıl çalışır? Next.js 14'ün sunduğu yeni özellikler ve best practices.",
    date: "2026-01-10",
    readTime: "12 dk",
    content: `
      <p>Next.js 14, React Server Components'ı varsayılan olarak destekleyen ve performans odaklı yenilikler sunan büyük bir güncelleme. Bu yazıda, Server Components'ın nasıl çalıştığını ve ne zaman kullanılması gerektiğini inceleyeceğiz.</p>
      
      <h2>Server vs Client Components</h2>
      <p>Server Components, sunucu tarafında render edilir ve client'a sadece HTML olarak gönderilir. Bu, JavaScript bundle boyutunu önemli ölçüde azaltır.</p>
      
      <ul>
        <li>Server Components: Data fetching, backend servislere erişim</li>
        <li>Client Components: Interaktif elementler, event handlers</li>
      </ul>
      
      <h2>'use client' Direktifi</h2>
      <p>Bir component'ı Client Component olarak işaretlemek için dosyanın başına 'use client' direktifi eklenir.</p>
      
      <pre><code>'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    &lt;button onClick={() => setCount(count + 1)}&gt;
      Count: {count}
    &lt;/button&gt;
  );
}</code></pre>
      
      <h2>Streaming ve Suspense</h2>
      <p>Next.js 14, React Suspense ile streaming SSR'ı destekler. Bu sayede, yavaş data kaynaklarını beklemeden sayfanın hızlı kısımlarını gösterebilirsiniz.</p>
    `
  },
  {
    id: 3,
    title: "TypeScript ile Type-Safe State Management",
    excerpt: "Redux Toolkit ve TypeScript kullanarak güvenli ve ölçeklenebilir state yönetimi stratejileri.",
    date: "2026-01-05",
    readTime: "10 dk",
    content: `
      <p>TypeScript, JavaScript'e statik tip kontrolü ekleyerek runtime hatalarını compile time'da yakalamamızı sağlar. Bu yazıda, Redux Toolkit ile type-safe state management kurulumunu inceleyeceğiz.</p>
      
      <h2>Store Konfigürasyonu</h2>
      <p>Redux Toolkit, TypeScript ile mükemmel entegrasyon sağlar. configureStore fonksiyonu, otomatik olarak state ve dispatch tiplerini çıkarır.</p>
      
      <pre><code>import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType&lt;typeof store.getState&gt;;
export type AppDispatch = typeof store.dispatch;</code></pre>
      
      <h2>Typed Hooks</h2>
      <p>Type-safe selector ve dispatch için custom hook'lar oluşturmak best practice'tir.</p>
      
      <pre><code>import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch&lt;AppDispatch&gt;();
export const useAppSelector: TypedUseSelectorHook&lt;RootState&gt; = useSelector;</code></pre>
      
      <h2>createSlice ile Reducer Yazımı</h2>
      <p>createSlice, action creator'ları otomatik olarak oluşturur ve TypeScript tipleri ile tam uyum sağlar.</p>
    `
  },
  {
    id: 4,
    title: "CSS Grid ve Flexbox: Modern Layout Teknikleri",
    excerpt: "Responsive ve modern web layoutları oluşturmak için CSS Grid ve Flexbox'ın birlikte kullanımı.",
    date: "2025-12-28",
    readTime: "7 dk",
    content: `
      <p>CSS Grid ve Flexbox, modern web layoutları oluşturmak için en güçlü araçlardır. Her birinin kendine özgü kullanım senaryoları vardır ve birlikte kullanıldığında mükemmel sonuçlar elde edilir.</p>
      
      <h2>Flexbox vs Grid: Ne Zaman Hangisi?</h2>
      <ul>
        <li><strong>Flexbox:</strong> Tek boyutlu layoutlar (row veya column)</li>
        <li><strong>Grid:</strong> İki boyutlu layoutlar (rows ve columns)</li>
      </ul>
      
      <h2>Grid Template Areas</h2>
      <p>Grid template areas, karmaşık layoutları görsel olarak tanımlamanın en kolay yoludur.</p>
      
      <pre><code>.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
}</code></pre>
      
      <h2>Responsive Design Patterns</h2>
      <p>auto-fill ve minmax() kombinasyonu ile media query olmadan responsive grid'ler oluşturabilirsiniz.</p>
      
      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}</code></pre>
    `
  },
  {
    id: 5,
    title: "Web Performance Optimizasyonu",
    excerpt: "Core Web Vitals, lazy loading, code splitting ve daha fazlası ile web performansını artırma teknikleri.",
    date: "2025-12-20",
    readTime: "15 dk",
    content: `
      <p>Web performansı, kullanıcı deneyimi ve SEO için kritik öneme sahiptir. Google'ın Core Web Vitals metrikleri, performansı ölçmek için standart haline gelmiştir.</p>
      
      <h2>Core Web Vitals</h2>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> En büyük içerik öğesinin yüklenme süresi</li>
        <li><strong>FID (First Input Delay):</strong> İlk kullanıcı etkileşimine yanıt süresi</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> Görsel kararlılık</li>
      </ul>
      
      <h2>Image Optimizasyonu</h2>
      <p>Modern format'lar (WebP, AVIF) ve responsive images kullanarak image optimizasyonu yapın.</p>
      
      <pre><code>&lt;picture&gt;
  &lt;source srcset="image.avif" type="image/avif"&gt;
  &lt;source srcset="image.webp" type="image/webp"&gt;
  &lt;img src="image.jpg" alt="Description" loading="lazy"&gt;
&lt;/picture&gt;</code></pre>
      
      <h2>Code Splitting</h2>
      <p>Dynamic import ile route-based code splitting uygulayarak initial bundle boyutunu küçültün.</p>
    `
  },
  {
    id: 6,
    title: "Git Workflow ve Best Practices",
    excerpt: "Takım çalışması için etkili Git stratejileri, branch yönetimi ve commit conventions.",
    date: "2025-12-15",
    readTime: "6 dk",
    content: `
      <p>Etkili bir Git workflow, takım verimliliğini artırır ve kod kalitesini korur. Bu yazıda, profesyonel projelerde kullanılan Git best practice'lerini inceleyeceğiz.</p>
      
      <h2>Branch Stratejileri</h2>
      <p>Git Flow veya GitHub Flow gibi stratejiler, takım çalışmasını organize eder.</p>
      
      <ul>
        <li><strong>main/master:</strong> Production-ready kod</li>
        <li><strong>develop:</strong> Aktif geliştirme</li>
        <li><strong>feature/*:</strong> Yeni özellikler</li>
        <li><strong>hotfix/*:</strong> Acil düzeltmeler</li>
      </ul>
      
      <h2>Conventional Commits</h2>
      <p>Standardize commit mesajları, changelog oluşturmayı ve semantic versioning'i otomatikleştirir.</p>
      
      <pre><code>feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
refactor: simplify validation logic
test: add unit tests for auth module</code></pre>
      
      <h2>Pull Request Best Practices</h2>
      <p>Küçük, focused PR'lar review sürecini hızlandırır. Her PR tek bir sorunu çözmelidir.</p>
    `
  }
];

// Render blog cards on blog.html
function renderBlogCards() {
  const container = document.getElementById('blog-container');
  if (!container) return;
  
  const html = blogPosts.map(post => `
    <article class="card fade-in">
      <h3 class="card-title">${post.title}</h3>
      <div class="card-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.readTime} okuma</span>
      </div>
      <p class="card-description">${post.excerpt}</p>
      <a href="blog-detail.html?id=${post.id}" class="btn btn-secondary mt-md" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;">
        Devamını Oku →
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
  
  const featured = blogPosts.slice(0, 3);
  
  const html = featured.map(post => `
    <article class="card">
      <h3 class="card-title">${post.title}</h3>
      <div class="card-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.readTime} okuma</span>
      </div>
      <p class="card-description">${post.excerpt}</p>
      <a href="blog-detail.html?id=${post.id}" class="btn btn-secondary mt-md" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;">
        Devamını Oku →
      </a>
    </article>
  `).join('');
  
  container.innerHTML = html;
}

// Render blog detail on blog-detail.html
function renderBlogDetail() {
  const container = document.getElementById('blog-detail');
  if (!container) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'));
  
  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) {
    container.innerHTML = `
      <div class="text-center">
        <h2>Blog yazısı bulunamadı</h2>
        <p class="mt-md">Aradığınız içerik mevcut değil.</p>
        <a href="blog.html" class="btn btn-primary mt-lg">Blog'a Dön</a>
      </div>
    `;
    return;
  }
  
  const html = `
    <a href="blog.html" class="back-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Blog'a Dön
    </a>
    <header class="blog-detail-header">
      <h1>${post.title}</h1>
      <div class="blog-detail-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.readTime} okuma</span>
      </div>
    </header>
    <div class="blog-detail-content">
      ${post.content}
    </div>
  `;
  
  container.innerHTML = html;
}

// Format date to Turkish locale
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
}

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', () => {
  renderBlogCards();
  renderFeaturedBlogs();
  renderBlogDetail();
});
