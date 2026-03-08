## Tmdb API sini kullanmak

![TMDB API](images/blog/3/1.png)

**Yusuf Yılmaz**

4 min read · Apr 5, 2022

Merhaba, bu yazıda sizlere birlikte api kullanarak popüler filmleri listeleyen bir web sayfası tasarlayacağız.
Öncelikle kısaca API nedir ona bakalım.

![TMDB API](images/blog/3/2.png)

### API Nedir?

API iki uygulamanın birbiri ile veri alışverişi yapmasını, konuşmasını sağlar. Bir uygulamanın işlevselliğini başka uygulamalar tarafından kullanılmasını sağlar.
Telefonumuzdaki hava durumu uygulaması gibi. Hava durumu uygulaması bu bilgileri sağlayan uygulamanın server ile iletişime geçer ve bilgileri uygulama içinde gösterir.İşte bu olaya API deriz
ama biz web tabanlı API lere odaklanacağız.
Web API leri JSON yada XML formatında veriler geri döner biz bu geri dönen
verileri kullanarak uygulamalarımızı tasralarız.

### Hangi Api yi kullanacağız?

Bu yazıda bir film API si kullanacağız ama sizler farklı APIler kullanmak isteyebilirsiniz. Şu github linkinden kategorize edilmiş bir çok APIye erişebilirsiniz. Biz Tmdb APIsini kullanacağız.
Bazı APIler key istemezken bazıları key e sahip olabilirler. bizim kullanacağımız istiyor.

### TMDB API den key alma

Tmdb APIsini kullanmak için öncelikle şu linkten üye olmamız gerekir.
Daha sonra Ayarlar>API ye tıklayarak key talebinde bulunalım ve sonra karşımıza developer olarak mı profesyonel olarak mı ihtiyaç duyuyoruz diye iki seçenek çıkacak. developer ı seçip şartları kabul edelim. En son olarak bizden nerede? niçin? kullanacağız gibi bilgiler isteyecek gerekli bilgileri dolduralım ve

![Video](images/blog/3/3.mp4)

artık key e sahibiz. Tmdb nin bize sağladığı bilgilerden istediklerimizi kullanarak uygulamamızı geliştirebiliriz. Buradaki linkten
hangi verilere nasıl ulaşacağımızı görebiliriz.

### Şimdi tasarım

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>my movie web site</title>
<link rel="stylesheet" href="pop.css" />
 <link
 rel="stylesheet"
 href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" /></head>
<body>
 <div class="control">
 <button id="previous"><i class="fa-solid fa-angles-left"></i></button>
 <div class="images"> 
 </div>
 <button id="next"><i class="fa-solid fa-angles-right"></i></button>
 </div>
 <div id="movie-details" class="movie-details hide">
 </div> 
<script src="pop.js"></script>
 </body>
</html>
```

Fetch edeceğimiz veriler images classına sahip divin içinde olacak.

### JavaScript kodları

Şimdi apı keyimizi ve gerekli urlleri js dosyasına yazalım

```javascript
let page = 1;
const APIKEY = "senin apı keyin";
//populer filmlere ulaşacağımız url
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=${page}`;
//film posterlerini gösterebilmek için gereken diğer url
const IMGPATH = `https://image.tmdb.org/t/p/w1280/`;
```

Html taglerini pageleme kodlarını ekleyelim

```javascript
// maniupule edeceğimiz html elementleri
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
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=${page}`;
getPopMovies(URL);

});
// previous page button
previousBtn.addEventListener("click", () => {
images.innerHTML = "";
page--;
if (page < 1) {
page = 500;
}
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=${page}`;
getPopMovies(URL);
}
});
```

Şimdi url i fetch etme zamanı

```javascript
// getting populer movies from apı
const getPopMovies = (url) => {
fetch(url).then(res=>res.json()).then(data=>{
showMovies(data);
})
};
```

Yukarıda görüldüğü gibi url imizi fetch() komutu içine attık fetch()yöntemi, yanıt hazır olduğunda yerine getirilen bir promise döndürerek ağdan bir kaynak alma sürecini başlatır. Daha sonra gelen promise JSON formatında olmadığı için json() komutu ile onu JSON a çeviriyoruz. json() komutu bize ikinci bir promise döndürecek. Burada bu işlemeleri then() komutu ile gerçekleştiriyoruz then() gelen promise in başarılı(resolve) mı başarısız(reject) mı olduğunu belli eden bir promise göndermemizi sağlar.2. promise de başarılı ise +filmeleri ekranda göstereceğimiz ShowMovies() fonksiyonuna parametre olarak gönderiyoruz.

```javascript
// showing movies on body
const showMovies = (data) => {
if (data.results !== null) {
data.results.forEach((e) => {
const { title: t, poster_path: p, vote_average: v, release_date: d ,id:i} = e;
let box = document.createElement("div");
box.classList.add("box");
box.innerHTML = `
<h1 id="title">${t}</h1>
<button class="savelater"><i class="fa-solid fa-bookmark"></i></button>
<img class="all-images" src="${IMGPATH + p}"
/>
<div class="info">
<h3 >${d.slice(0, 4)}</h3>
<h3>${v}</h3>
</div>
<button class="details up"><i class="fa-solid fa-angles-up"></i></button>
</div>
`;
images.appendChild(box);
});
}
};
```

Önce getPopMovies() den aldığımız data parameterinin results propertyisinin null olup olmadığını kontrol ediyoruz. data.results ın içindeki verilere erişmek için foreach yapısının kullanıyoruz. verileri daha rahat erişmek için ise Object destructuring kullanarak filmin afişi,ismine,puanına ve vizyon tarihine erişiyoruz. Bu verileri create ettiğimiz divin içine innerHTML i kullanarak ekliyoruz. Önceden bahsettiğimiz imagesin içine bu html kodlarını eklemek için images.appendChild(box) diyerek verileri sayfaya ekliyoruz. Şimdi kodumuzu biraz css ile güzelleştirip son haline getirelim

Sugar, spice and evreything nice

![Video](images/blog/3/4.mp4)

İşte sitemizin son hali

![Video](images/blog/3/5.mp4)

Search özelliği genre filtreme vb özellikler ekleyerek daha efektif hale getirmek size kalmış:) Bu yazıda bana eşlik ettiğiniz için teşekkür eder ve iyi günler dilerim.

#### Kaynakça

- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [TMDB API Documentation](https://www.themoviedb.org/documentation/api)

`JavaScript` `JSON` `API` `TMDB` `Movies` `Fetch`
