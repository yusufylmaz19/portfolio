// Blog Posts Data - Real Medium Articles by Yusuf Yılmaz
const blogPosts = [
  {
    id: 1,
    title: "HTTP, HTTPS, SSL/TLS, SSH",
    excerpt: "Web ve HTTP protokollerinin detaylı incelemesi. HTTP request/response yapısı, HTTPS güvenliği, SSL sertifikaları ve SSH protokolü hakkında kapsamlı rehber.",
    date: "2022-07-28",
    readTime: "11 dk",
    mediumUrl: "https://medium.com/@yusufylmaz15/http-https-ssl-tls-ssh-c7126392e2b5",
    content: `
      <h2>Web ve HTTP</h2>
      <p>1990'ların başına kadar İnternet öncelikle araştırmacılar, akademisyenler ve üniversite öğrencileri tarafından kullanılıyordu. Ta ki WWW (World Wide Web) sahneye çıkana kadar. Web, halkın dikkatini çeken ilk İnternet uygulamasıydı.</p>
      
      <h2>HTTP'ye Genel Bakış</h2>
      <p>Hyper Text Transfer Protokol (HTTP) web'in uygulama katmanında 80 port numarası ile çalışan bir protokoldür. HTTP 2 programda uygulanır: istemci (client) programı ve sunucu (server) programı.</p>
      
      <p>Bir Web sayfası object (nesne)lerden oluşur. Bir object kısaca HTML, JPEG, video-clip vb. - kısaca single URL ile adreslenebilir bir dosyadır.</p>
      
      <p>Her URL'in 2 tane bileşeni vardır: <strong>hostname</strong> ve <strong>pathname</strong>.</p>
      <pre><code>http://www.someSchool.edu/someDepartment/picture.gif
hostname: www.someSchool.edu
pathname: /someDepartment/picture.gif</code></pre>
      
      <h2>HTTP Request/Response</h2>
      <p>HTTP, temel aktarım protokolü olarak TCP'yi kullanır. HTTP client'i önce server ile bir TCP bağlantısı başlatır. Bağlantı kurulduğunda, browser ve server işlemleri TCP'ye kendi soket arayüzleri üzerinden erişim sağlar.</p>
      
      <h3>HTTP Methods</h3>
      <ul>
        <li><strong>GET:</strong> Browser bir object için request'te bulunduğunda kullanılır</li>
        <li><strong>POST:</strong> Form verilerini göndermek için kullanılır</li>
        <li><strong>PUT:</strong> Sunucudaki bir kaynağı güncellemek için kullanılır</li>
        <li><strong>DELETE:</strong> Sunucudaki bir kaynağı silmeye yarar</li>
        <li><strong>PATCH:</strong> Kaynağın bir kısmını değiştirmeye yarar</li>
      </ul>
      
      <h3>HTTP Status Kodları</h3>
      <ul>
        <li><strong>1xx:</strong> Bilgilendirici</li>
        <li><strong>2xx:</strong> Başarı (200 OK)</li>
        <li><strong>3xx:</strong> Yönlendirme (301, 302)</li>
        <li><strong>4xx:</strong> İstemci Hatası (404 Not Found)</li>
        <li><strong>5xx:</strong> Sunucu Hatası (500, 503)</li>
      </ul>
      
      <h2>HTTPS</h2>
      <p>HTTPS, HTTP'nin güvenli sürümüdür. Veri aktarımının güvenliğini artırmak için HTTPS şifrelenir. HTTPS, iletişimleri şifrelemek için TLS (Transport Layer Security) protokolünü kullanır.</p>
      
      <h3>Public/Private Key</h3>
      <ul>
        <li><strong>Private Key:</strong> Web sitesinin sahibi tarafından kontrol edilir ve gizli tutulur</li>
        <li><strong>Public Key:</strong> Sunucuyla güvenli etkileşim kurmak isteyen herkes tarafından kullanılabilir</li>
      </ul>
      
      <h2>SSL/TLS</h2>
      <p>SSL (Secure Sockets Layer), 443 portunda çalışan şifreleme tabanlı bir İnternet güvenlik protokolüdür. 1999'da SSL, TLS olarak güncellendi.</p>
      
      <h3>SSL Sertifika Türleri</h3>
      <ul>
        <li><strong>Single-Domain:</strong> Yalnızca bir domain için geçerli</li>
        <li><strong>Wildcard:</strong> Domain ve alt domainler için geçerli</li>
        <li><strong>Multi-Domain:</strong> Birden fazla domain için geçerli</li>
      </ul>
      
      <h2>SSH</h2>
      <p>Secure Shell (SSH), kullanıcılara güvenli olmayan bir ağ üzerinden bir bilgisayara güvenli erişim sağlayan bir ağ protokolüdür. Varsayılan olarak TCP port 22'yi kullanır.</p>
      
      <pre><code>ssh UserName@SSHserver.example.com</code></pre>
      
      <p>SSH, her bağlantının kimliğini doğrulamak için ayrı key çiftleri kullanır ve tüm bağlantıları şifreler.</p>
    `
  },
  {
    id: 2,
    title: "Git: Versiyon Kontrol Sistemi Rehberi",
    excerpt: "Git nedir, nasıl çalışır? Branch, merge, stash, rebase ve GitHub entegrasyonu dahil kapsamlı Git rehberi.",
    date: "2022-07-25",
    readTime: "9 dk",
    mediumUrl: "https://medium.com/@yusufylmaz15/git-718e2963910",
    content: `
      <h2>Git Nedir?</h2>
      <p>Git, Linus Torvalds tarafından Linux'un çekirdeğini geliştirmek üzere tasarlanıp kullanılan bir versiyon kontrol sistemidir. Projede yaptığınız değişikleri versiyonlama ve bu versiyonlar arasında dolaşmak için kullanılan bir yapıdır.</p>
      
      <h3>Git'i Popüler Yapan Şeyler</h3>
      <ul>
        <li>Hızlı olması</li>
        <li>Yüzlerce farklı branch'te geliştirme ortamı sağlaması</li>
        <li>Büyük çaplı projelerde rahatlıkla çalışması</li>
        <li>GitHub gibi popüler bir mecra tarafından kullanılması</li>
      </ul>
      
      <h2>Git Yapısı</h2>
      <ul>
        <li><strong>Working Directory:</strong> Projemizin içinde olduğu klasör ortamı</li>
        <li><strong>Staging Area:</strong> .git directory'sine atmadan önce değişiklikleri beklettiğimiz alan</li>
        <li><strong>.git Directory:</strong> Emin olduğumuz değişiklikleri commit ettiğimiz klasör</li>
      </ul>
      
      <h2>Temel Git Komutları</h2>
      
      <h3>git config</h3>
      <pre><code>git config --global user.email "your@email.com"
git config --global user.name "yourname"</code></pre>
      
      <h3>git init</h3>
      <p>Bu komut, çalıştığımız klasörün git tarafından takip edilebileceğini ifade eder.</p>
      
      <h3>git add</h3>
      <pre><code>git add filename    # Tek dosya ekle
git add .           # Tüm değişiklikleri ekle</code></pre>
      
      <h3>git commit</h3>
      <pre><code>git commit -m "commit mesajı"</code></pre>
      
      <h2>Branch Yönetimi</h2>
      <pre><code>git branch              # Branchleri listele
git branch feat         # Yeni branch oluştur
git switch feat         # Branch'e geç
git branch -d feat      # Branch'i sil</code></pre>
      
      <h2>Merge ve Conflict</h2>
      <p>İki branch'i birleştirmek için <code>git merge</code> kullanılır. Eğer conflict yoksa merge işlemi başarılı olur.</p>
      
      <h3>Fast Forward</h3>
      <p>Yeni branch'te commit atıp, master'da hiç değişiklik yapmazsak, merge işlemi fast forwarding olur.</p>
      
      <h2>git stash</h2>
      <p>Commit etmeye hazır olmadığımız durumlarda değişiklikleri geçici olarak saklamak için kullanılır.</p>
      <pre><code>git stash           # Değişiklikleri sakla
git stash pop       # Değişiklikleri geri getir
git stash list      # Saklanan değişiklikleri listele</code></pre>
      
      <h2>git checkout, reset, revert</h2>
      <pre><code>git checkout hashcode   # Commit'e geri dön
git reset hashcode      # Commit'leri sil (değişiklikler kalır)
git reset --hard hash   # Commit ve değişiklikleri sil
git revert hashcode     # Commit'i geri al (yeni commit ile)</code></pre>
      
      <h2>Remote İşlemleri</h2>
      <pre><code>git remote add origin url   # Remote repo ekle
git push origin main        # Değişiklikleri gönder
git pull                    # Değişiklikleri çek
git clone url               # Repo'yu klonla</code></pre>
    `
  },
  {
    id: 3,
    title: "TMDB API'sini Kullanma",
    excerpt: "API nedir ve nasıl kullanılır? TMDB API ile popüler filmleri listeleyen bir web sayfası oluşturma rehberi.",
    date: "2022-04-05",
    readTime: "4 dk",
    mediumUrl: "https://medium.com/@yusufylmaz15/tmdb-api-sini-kullanma-1e9a69269417",
    content: `
      <h2>API Nedir?</h2>
      <p>API iki uygulamanın birbiri ile veri alışverişi yapmasını, konuşmasını sağlar. Bir uygulamanın işlevselliğini başka uygulamalar tarafından kullanılmasını sağlar.</p>
      
      <p>Web API'leri JSON veya XML formatında veriler geri döner. Biz bu geri dönen verileri kullanarak uygulamalarımızı tasarlarız.</p>
      
      <h2>TMDB API'den Key Alma</h2>
      <ol>
        <li>TMDB sitesine üye olun</li>
        <li>Ayarlar > API'ye tıklayın</li>
        <li>Developer seçeneğini seçin</li>
        <li>Gerekli bilgileri doldurun ve key'inizi alın</li>
      </ol>
      
      <h2>Proje Yapısı</h2>
      
      <h3>HTML</h3>
      <pre><code>&lt;div class="control"&gt;
  &lt;button id="previous"&gt;&lt;/button&gt;
  &lt;div class="images"&gt;&lt;/div&gt;
  &lt;button id="next"&gt;&lt;/button&gt;
&lt;/div&gt;</code></pre>
      
      <h3>JavaScript - API Ayarları</h3>
      <pre><code>let page = 1;
const APIKEY = "senin_api_keyin";
const URL = \`https://api.themoviedb.org/3/movie/popular?api_key=\${APIKEY}&language=en-US&page=\${page}\`;
const IMGPATH = \`https://image.tmdb.org/t/p/w1280/\`;</code></pre>
      
      <h3>Fetch İşlemi</h3>
      <pre><code>const getPopMovies = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showMovies(data);
    });
};</code></pre>
      
      <h3>Filmleri Gösterme</h3>
      <pre><code>const showMovies = (data) => {
  if (data.results !== null) {
    data.results.forEach((e) => {
      const { title: t, poster_path: p, vote_average: v, release_date: d } = e;
      let box = document.createElement("div");
      box.classList.add("box");
      box.innerHTML = \`
        &lt;h1&gt;\${t}&lt;/h1&gt;
        &lt;img src="\${IMGPATH + p}" /&gt;
        &lt;div class="info"&gt;
          &lt;h3&gt;\${d.slice(0, 4)}&lt;/h3&gt;
          &lt;h3&gt;\${v}&lt;/h3&gt;
        &lt;/div&gt;
      \`;
      images.appendChild(box);
    });
  }
};</code></pre>
      
      <p>Search özelliği, genre filtreleme vb. özellikler ekleyerek daha efektif hale getirmek size kalmış!</p>
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
  renderGallery();
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
  {
    id: 'GRxzoKO',
    title: 'John Lennon',
    tag: 'Pure CSS Art'
  },
  {
    id: 'BarKWRB',
    title: 'The Office Logo',
    tag: 'Pure CSS Art'
  }
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
