export const post3 = {
  id: 3,
  title: {
    tr: "TMDB API'sini kullanmak",
    en: "Using the TMDB API"
  },
  excerpt: {
    tr: "TMDB API ile popüler filmleri listeleyen bir web sayfası oluşturma rehberi.",
    en: "A guide to creating a web page that lists popular movies using the TMDB API."
  },
  date: "2022-04-05",
  readTime: "4 dk",
  mediumUrl: "",
  content: {
    tr: `
      <h2>Tmdb API sini kullanmak</h2>
      <img src="images/blog/3/1.png" alt="TMDB API" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p><strong>Yusuf Yılmaz</strong></p>
      <p>4 min read · Apr 5, 2022</p>
      <p>Merhaba, bu yazıda sizlere birlikte api kullanarak popüler filmleri listeleyen bir web sayfası tasarlayacağız.<br>
      Öncelikle kısaca API nedir ona bakalım.</p>
      <img src="images/blog/3/2.png" alt="TMDB API" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h3>API Nedir?</h3>
      <p>API iki uygulamanın birbiri ile veri alışverişi yapmasını, konuşmasını sağlar. Bir uygulamanın işlevselliğini başka uygulamalar tarafından kullanılmasını sağlar.<br>
      Telefonumuzdaki hava durumu uygulaması gibi. Hava durumu uygulaması bu bilgileri sağlayan uygulamanın server ile iletişime geçer ve bilgileri uygulama içinde gösterir.İşte bu olaya API deriz
      ama biz web tabanlı API lere odaklanacağız.<br>
      Web API leri JSON yada XML formatında veriler geri döner biz bu geri dönen
      verileri kullanarak uygulamalarımızı tasralarız.</p>
      <h3>Hangi Api yi kullanacağız?</h3>
      <p>Bu yazıda bir film API si kullanacağız ama sizler farklı APIler kullanmak isteyebilirsiniz. Şu github linkinden kategorize edilmiş bir çok APIye erişebilirsiniz. Biz Tmdb APIsini kullanacağız.<br>
      Bazı APIler key istemezken bazıları key e sahip olabilirler. bizim kullanacağımız istiyor.</p>
      <h3>TMDB API den key alma</h3>
      <p>Tmdb APIsini kullanmak için öncelikle şu linkten üye olmamız gerekir.<br>
      Daha sonra Ayarlar&gt;API ye tıklayarak key talebinde bulunalım ve sonra karşımıza developer olarak mı profesyonel olarak mı ihtiyaç duyuyoruz diye iki seçenek çıkacak. developer ı seçip şartları kabul edelim. En son olarak bizden nerede? niçin? kullanacağız gibi bilgiler isteyecek gerekli bilgileri dolduralım ve</p>
      <img video-src="images/blog/3/3.mp4" poster-src="images/blog/3/video-poster.png"></img>
      <p>artık key e sahibiz. Tmdb nin bize sağladığı bilgilerden istediklerimizi kullanarak uygulamamızı geliştirebiliriz. Buradaki linkten
      hangi verilere nasıl ulaşacağımızı görebiliriz.</p>
      <h3>Şimdi tasarım</h3>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
 &lt;head&gt;
 &lt;meta charset="UTF-8" /&gt;
 &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
 &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
 &lt;title&gt;my movie web site&lt;/title&gt;
&lt;link rel="stylesheet" href="pop.css" /&gt;
 &lt;link
 rel="stylesheet"
 href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" /&gt;&lt;/head&gt;
&lt;body&gt;
 &lt;div class="control"&gt;
 &lt;button id="previous"&gt;&lt;i class="fa-solid fa-angles-left"&gt;&lt;/i&gt;&lt;/button&gt;
 &lt;div class="images"&gt; 
 &lt;/div&gt;
 &lt;button id="next"&gt;&lt;i class="fa-solid fa-angles-right"&gt;&lt;/i&gt;&lt;/button&gt;
 &lt;/div&gt;
 &lt;div id="movie-details" class="movie-details hide"&gt;
 &lt;/div&gt; 
&lt;script src="pop.js"&gt;&lt;/script&gt;
 &lt;/body&gt;
&lt;/html&gt;</code></pre>
      <p>Fetch edeceğimiz veriler images classına sahip divin içinde olacak.</p>
      <h3>JavaScript kodları</h3>
      <p>Şimdi apı keyimizi ve gerekli urlleri js dosyasına yazalım</p>
      <pre><code>let page = 1;
const APIKEY = "senin apı keyin";
//populer filmlere ulaşacağımız url
const URL = \`https://api.themoviedb.org/3/movie/popular?api_key=\${APIKEY}&language=en-US&page=\${page}\`;
//film posterlerini gösterebilmek için gereken diğer url
const IMGPATH = \`https://image.tmdb.org/t/p/w1280/\`;</code></pre>
      <p>Html taglerini pageleme kodlarını ekleyelim</p>
      <pre><code>// maniupule edeceğimiz html elementleri
const images = document.querySelector(".images");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");
// next page button
nextBtn.addEventListener("click", () => {
images.innerHTML = "";
page++;
if (page > 500) {
page = 1;
}
const URL = \`https://api.themoviedb.org/3/movie/popular?api_key=\${APIKEY}&language=en-US&page=\${page}\`;
getPopMovies(URL);

});
// previous page button
previousBtn.addEventListener("click", () => {
images.innerHTML = "";
page--;
if (page < 1) {
page = 500;
}
const URL = \`https://api.themoviedb.org/3/movie/popular?api_key=\${APIKEY}&language=en-US&page=\${page}\`;
getPopMovies(URL);
}
});</code></pre>
      <p>Şimdi url i fetch etme zamanı</p>
      <pre><code>// getting populer movies from apı
const getPopMovies = (url) => {
fetch(url).then(res=>res.json()).then(data=>{
showMovies(data);
})
};</code></pre>
      <p>Yukarıda görüldüğü gibi url imizi fetch() komutu içine attık fetch()yöntemi, yanıt hazır olduğunda yerine getirilen bir promise döndürerek ağdan bir kaynak alma sürecini başlatır. Daha sonra gelen promise JSON formatında olmadığı için json() komutu ile onu JSON a çeviriyoruz. json() komutu bize ikinci bir promise döndürecek. Burada bu işlemeleri then() komutu ile gerçekleştiriyoruz then() gelen promise in başarılı(resolve) mı başarısız(reject) mı olduğunu belli eden bir promise göndermemizi sağlar.2. promise de başarılı ise +filmeleri ekranda göstereceğimiz ShowMovies() fonksiyonuna parametre olarak gönderiyoruz.</p>
      <pre><code>// showing movies on body
const showMovies = (data) => {
if (data.results !== null) {
data.results.forEach((e) => {
const { title: t, poster_path: p, vote_average: v, release_date: d ,id:i} = e;
let box = document.createElement("div");
box.classList.add("box");
box.innerHTML = \`
&lt;h1 id="title"&gt;\${t}&lt;/h1&gt;
&lt;button class="savelater"&gt;&lt;i class="fa-solid fa-bookmark"&gt;&lt;/i&gt;&lt;/button&gt;
&lt;img class="all-images" src="\${IMGPATH + p}"
/&gt;
&lt;div class="info"&gt;
&lt;h3 &gt;\${d.slice(0, 4)}&lt;/h3&gt;
&lt;h3&gt;\${v}&lt;/h3&gt;
&lt;/div&gt;
&lt;button class="details up"&gt;&lt;i class="fa-solid fa-angles-up"&gt;&lt;/i&gt;&lt;/button&gt;
&lt;/div&gt;
\`;
images.appendChild(box);
});
}
};</code></pre>
      <p>Önce getPopMovies() den aldığımız data parameterinin results propertyisinin null olup olmadığını kontrol ediyoruz. data.results ın içindeki verilere erişmek için foreach yapısının kullanıyoruz. verileri daha rahat erişmek için ise Object destructuring kullanarak filmin afişi,ismine,puanına ve vizyon tarihine erişiyoruz. Bu verileri create ettiğimiz divin içine innerHTML i kullanarak ekliyoruz. Önceden bahsettiğimiz imagesin içine bu html kodlarını eklemek için images.appendChild(box) diyerek verileri sayfaya ekliyoruz. Şimdi kodumuzu biraz css ile güzelleştirip son haline getirelim</p>
      <p>Sugar, spice and evreything nice</p>
      <img video-src="images/blog/3/4.mp4" poster-src="images/blog/3/video-poster.png"></img>
      <p>İşte sitemizin son hali</p>
      <img video-src="images/blog/3/5.mp4" poster-src="images/blog/3/video-poster.png"></img>
      <p>Search özelliği genre filtreme vb özellikler ekleyerek daha efektif hale getirmek size kalmış:) Bu yazıda bana eşlik ettiğiniz için teşekkür eder ve iyi günler dilerim.</p>
      <div class="blog-sources">
        <h4>Kaynakça</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/" target="_blank">MDN Web Docs</a></li>
          <li><a href="https://www.themoviedb.org/documentation/api" target="_blank">TMDB API Documentation</a></li>
        </ul>
      </div>
      <div class="blog-tags">
        <span class="blog-tag">JavaScript</span>
        <span class="blog-tag">JSON</span>
        <span class="blog-tag">API</span>
        <span class="blog-tag">TMDB</span>
        <span class="blog-tag">Movies</span>
        <span class="blog-tag">Fetch</span>
      </div>
    `,
    en: `
      <h2>Using the TMDB API</h2>
      <img src="images/blog/3/1.png" alt="TMDB API" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p><strong>Yusuf Yılmaz</strong></p>
      <p>4 min read · Apr 5, 2022</p>
      <p>Hello! In this post, we will design a web page together that lists popular movies by using an API.<br>
      First, let's briefly look at what an API is.</p>
      
      <img src="images/blog/3/2.png" alt="TMDB API" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h3>What is an API?</h3>
      <p>An API allows two applications to exchange data and communicate with each other. It enables the functionality of one application to be used by other applications.<br>
      Think of the weather app on your phone. The weather app communicates with the server of the application that provides this data and displays the information within the app. This is what we call an API, but we will focus specifically on web-based APIs.<br>
      Web APIs return data in JSON or XML format. We design our applications using this returned data.</p>
      <h3>Which API will we use?</h3>
      <p>In this post, we will use a movie API, but you might want to use different APIs. You can access many categorized APIs from this GitHub link. We will be using the TMDB API.<br>
      While some APIs do not require a key, others might. The one we are using requires an API key.</p>
      <h3>Getting a Key from TMDB API</h3>
      <p>To use the TMDB API, we first need to sign up at this link.<br>
      Then, click on Settings > API to request a key. You will be presented with two options: whether you need it as a developer or a professional. Select "Developer" and accept the terms. Finally, it will ask for information such as "Where?" and "Why?" you will use it. Fill in the required details and...</p>
      <img video-src="images/blog/3/3.mp4" poster-src="images/blog/3/video-poster.png"></img>
      <p>...now we have a key! We can develop our application using the data provided by TMDB. You can see how to access specific data from the link provided there.</p>
      <h3>Now, the Design</h3>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
 &lt;head&gt;
 &lt;meta charset="UTF-8" /&gt;
 &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
 &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
 &lt;title&gt;my movie web site&lt;/title&gt;
&lt;link rel="stylesheet" href="pop.css" /&gt;
 &lt;link
 rel="stylesheet"
 href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" /&gt;&lt;/head&gt;
&lt;body&gt;
 &lt;div class="control"&gt;
 &lt;button id="previous"&gt;&lt;i class="fa-solid fa-angles-left"&gt;&lt;/i&gt;&lt;/button&gt;
 &lt;div class="images"&gt; 
 &lt;/div&gt;
 &lt;button id="next"&gt;&lt;i class="fa-solid fa-angles-right"&gt;&lt;/i&gt;&lt;/button&gt;
 &lt;/div&gt;
 &lt;div id="movie-details" class="movie-details hide"&gt;
 &lt;/div&gt; 
&lt;script src="pop.js"&gt;&lt;/script&gt;
 &lt;/body&gt;
&lt;/html&gt;</code></pre>
      <p>The data we fetch will be placed inside the div with the "images" class.</p>
      <h3>JavaScript Code</h3>
      <p>Now, let's write our API key and the necessary URLs in the JS file:</p>
      <pre><code>let page = 1;
const APIKEY = "your_api_key_here";
// URL to access popular movies
const URL = \`https://api.themoviedb.org/3/movie/popular?api_key=\${APIKEY}&language=en-US&page=\${page}\`;
// Additional URL required to display movie posters
const IMGPATH = \`https://image.tmdb.org/t/p/w1280/\`;</code></pre>
      <p>Let's add the HTML tags and pagination logic:</p>
      <pre><code>// HTML elements to manipulate
const images = document.querySelector(".images");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");

// next page button
nextBtn.addEventListener("click", () => {
  images.innerHTML = "";
  page++;
  if (page > 500) {
    page = 1;
  }
  const URL = \`https://api.themoviedb.org/3/movie/popular?api_key=\${APIKEY}&language=en-US&page=\${page}\`;
  getPopMovies(URL);
});

// previous page button
previousBtn.addEventListener("click", () => {
  images.innerHTML = "";
  page--;
  if (page < 1) {
    page = 500;
  }
  const URL = \`https://api.themoviedb.org/3/movie/popular?api_key=\${APIKEY}&language=en-US&page=\${page}\`;
  getPopMovies(URL);
});</code></pre>
      <h3>Fetching the URL</h3>
      <pre><code>// getting popular movies from API
const getPopMovies = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showMovies(data);
    })
};</code></pre>
      <p>As seen above, we passed our URL into the <code>fetch()</code> command. The <code>fetch()</code> method starts the process of fetching a resource from the network, returning a promise that is fulfilled once the response is available. Since the initial promise is not in JSON format, we convert it to JSON using the <code>json()</code> command. The <code>json()</code> method returns a second promise. We handle these processes using the <code>then()</code> command, which allows us to handle whether the promise was successful (resolve) or not (reject). If the second promise is also successful, we pass the movies as a parameter to the <code>showMovies()</code> function to display them on the screen.</p>
      <pre><code>// showing movies on body
const showMovies = (data) => {
  if (data.results !== null) {
    data.results.forEach((e) => {
      const { title: t, poster_path: p, vote_average: v, release_date: d, id: i } = e;
      let box = document.createElement("div");
      box.classList.add("box");
      box.innerHTML = \`
        &lt;h1 id="title"&gt;\${t}&lt;/h1&gt;
        &lt;button class="savelater"&gt;&lt;i class="fa-solid fa-bookmark"&gt;&lt;/i&gt;&lt;/button&gt;
        &lt;img class="all-images" src="\${IMGPATH + p}" /&gt;
        &lt;div class="info"&gt;
          &lt;h3&gt;\${d.slice(0, 4)}&lt;/h3&gt;
          &lt;h3&gt;\${v}&lt;/h3&gt;
        &lt;/div&gt;
        &lt;button class="details up"&gt;&lt;i class="fa-solid fa-angles-up"&gt;&lt;/i&gt;&lt;/button&gt;
      \`;
      images.appendChild(box);
    });
  }
};</code></pre>
      <p>First, we check if the <code>results</code> property of the <code>data</code> parameter we received from <code>getPopMovies()</code> is null. We use a <code>forEach</code> loop to access the data within <code>data.results</code>. To access the data more easily, we use Object Destructuring to get the movie's poster, title, rating, and release date. We add this data into the div we created using <code>innerHTML</code>. Finally, we add these HTML snippets into the previously mentioned "images" container by using <code>images.appendChild(box)</code>. Now, let's beautify our code with some CSS and look at the final version.</p>
      <p>Sugar, spice and everything nice!</p>
      <img video-src="images/blog/3/4.mp4" poster-src="images/blog/3/video-poster.png"></img>
      <p>Here is the final state of our site:</p>
      <img video-src="images/blog/3/5.mp4" poster-src="images/blog/3/video-poster.png"></img>
      <p>Adding features like Search or Genre filtering to make it more effective is up to you! :) Thank you for joining me in this post, and have a great day.</p>
      <div class="blog-sources">
        <h4>References</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/" target="_blank">MDN Web Docs</a></li>
          <li><a href="https://www.themoviedb.org/documentation/api" target="_blank">TMDB API Documentation</a></li>
        </ul>
      </div>
      <div class="blog-tags">
        <span class="blog-tag">JavaScript</span>
        <span class="blog-tag">JSON</span>
        <span class="blog-tag">API</span>
        <span class="blog-tag">TMDB</span>
        <span class="blog-tag">Movies</span>
        <span class="blog-tag">Fetch</span>
      </div>
    `
  }
};
