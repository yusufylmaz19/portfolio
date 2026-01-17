export const post1 = {
  id: 1,
  title: {
    tr: "HTTP, HTTPS, SSL/TLS, SSH",
    en: "HTTP, HTTPS, SSL/TLS, SSH"
  },
  excerpt: {
    tr: "HTTP, HTTPS, SSL/TLS, SSH protokolleri ve webin temelleri hakkında detaylı, eksiksiz bir rehber.",
    en: "A detailed, comprehensive guide about HTTP, HTTPS, SSL/TLS, SSH protocols and web fundamentals."
  },
  date: "2022-07-28",
  readTime: "11 dk",
  mediumUrl: "",
  content: {
    tr: `
      <h2>HTTP, HTTPS, SSL/TLS,SSH</h2>
      <h3>Web ve HTTP</h3>
      <p>1990'ların başına kadar İnternet öncelikle araştırmacılar, akademisyenler ve üniversite öğrencileri tarafından kullanılıyordu. uzak ana bilgisayarlarda oturum açmak, yerel ana bilgisayarlardan uzak ana bilgisayarlara dosya aktarmak ve bunun tam tersi için, haber göndermek ve almak, elektronik posta almak ve göndermek için kullanılıyordu.Ta ki WWW (Wordl Wide Web) sahneye çıkana kadar. Web, halkın dikkatini çeken ilk İnternet uygulamasıydı. İnsanların çalışma ortamlarının içinde ve dışında nasıl etkileşime girdiğini önemli ölçüde değiştirdi ve değiştirmeye devam ediyor. Belki de kullanıcılara en çok hitap eden şey, Web’in talep üzerine çalışmasıdır. Kullanıcılar istedikleri zaman istedikleri şeyleri alırlar.bu Tv ve Radyo yayınlarının tam tersidir.Web herkesi bir yayıncı hale getirdi.Arama motorları web okyanusunda gezinmemizi sağladı. Formlar, JavaScript, Java uygulamaları ve diğer birçok cihaz sayfalar ve sitelerle etkileşim kurmamızı sağlar. Ve Web protokolleri, YouTube, Web tabanlı e-posta (Gmail gibi) ve çoğu mobil İnternet uygulaması, Instagram ve Google Haritalar için bir platform görevi görür.</p>
      <h3>HTTP’ye genel bakış</h3>
      <p>Hyper Text Transfer Protokol(HTTP) web’in uygulama katmanında 80 port numarası ile çalışan bir prokoldür. Web’in kalbi diyebiliriz. Http 2 programda uygulanır: istemci(client) programı ve sunucu(server) programı. Server ve Client, uç sistemleri çalıştırarak, http mesajlarını birbirleri ile değiştirerek mesajlaşırlar. Bu mesajların yapısı HTTP tarafından tanımlanır. HTTP’nin detaylarına inmeden önce bazı web terminolojini inceleyelim. Bir Web sayfası (document de denebilir) object (nesne) lerden oluşur.Bir objectkısaca html, jpeg video-clip vb- kısaca single URL ile adreslenebilir bir dosyadır.</p>
      <p>Çoğunlukla web sayfası temel bir HTML dosyasıdan ve birçok farklı objecten oluşur. Örnek olarak bir Web sayfasında 1 html 5 tane jpeg dosyası var ise bu web sayfasında toplamada 6 tane object vardır. Temel HTML dosyası, nesnelerin URL’leri ile sayfadaki diğer nesnelere başvurur.Her URL in 2 tane bileşeni vardır: hostname ve pathname. Örnek olarak: http://www.someSchool.edu/someDepartment/picture.gif Bu URL www.someSchool.edu hostname , /someDepartment/picture.gif ise pathnamedir.Web Browserlar HTTP’nin Client tarafını uygularken, Web Serverlar Server Tarafını uygular. HTTP, Web clientların Web serverından Web sayfalarını nasıl talep ettiğini ve serverların Web sayfalarını clientlara nasıl aktardığını tanımlar. Client bir Request te bulunduğunda (bir linke tıklarsa mesela) Browser, sayfadaki objectler için server a HTTP Request mesajı gönderir. Server, request mesajını aldığında bu mesaj için browser a http response ile response mesajı gönderir.</p>
      <p>HTTP, temel aktarım protokolü olarak TCP’yi kullanır. HTTP client i önce server ile bir TCP bağlantısı başlatır. Bağlantı kurulduğunda, browser ve server işlemleri TCP’ye kendi soket arayüzleri üzerinden erişim sağlar. Client tarafında, soket arabirimi, istemci işlemi ile TCP bağlantısı arasındaki kapıdır; server tarafında ise sunucu işlemi ile TCP bağlantısı arasındaki kapıdır. Client, HTTP istek mesajlarını soket arayüzüne gönderir ve HTTP yanıt mesajlarını soket arayüzünden alır.</p>
      <img src="images/blog/1/1.png" alt="HTTP Socket Interface" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <p>Benzer şekilde, HTTP server soket arayüzünden istek mesajları alır ve soket arayüzüne cevap mesajları gönderir. İstemci soket arayüzüne bir mesaj gönderdiğinde, mesaj artık clientın elinden çıkmış TCP’nin eline geçmiştir. TCP, HTTP’ye güvenilir bir veri aktarım hizmeti sağlar. Bu, şu anlama gelir: bir client işlemi tarafından gönderilen her HTTP istek mesajı, sonunda servera bozulmadan ulaşır; benzer şekilde, server işlemi tarafından gönderilen her HTTP yanıt mesajı, sonunda clienta eksiksiz olarak ulaşır. Burada katmanlı mimarini büyük bir avantajını görüyoruz. HTTP, datada oluşacak kayıp ile ilgilenmez, bu iş TCP tarafından gerçekleştirilir.</p>
      <h3>HTTP mesaj formatları</h3>
      <p>Response message ve Request message olmak üzere 2 farklı mesaj formatı vardır</p>
      <img src="images/blog/1/2.png" alt="HTTP Message Formats" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <small>HTTP Request Message yapısı</small>
      Öncelikle mesajın sıradan ASCII metninde yazıldığını görüyoruz, Sırdan bir bilgisayar okur yazarı bile bunu okuyabilir. İkinci olarak, mesajın her biri bir satır başı ve bir satır içeriği olarak birbirini takipeden beş satırdan oluştuğunu görüyoruz.Bu request mesajı 5 satrıdan oluşuyor ama daha fazla mesajdanda oluşabilir.</p>
      <p>HTTP request mesajını ilk satırı request satırı olarak adlandırılır.Sonraki satırlar ise Header Satırları olarak adlandırılır. Request satırı 3 alandan oluşur: Method alanı, URL alanı ve HTTP versiyon alanı.</p>
      <p>Method alanı GET,POST,PUT,DELETE,HEAD gibi değerler alabilir. En çok kullanılan GET ve POST tur. GET browser bir object için requestte bulunduğunda kullanılır.</p>
      <ul>
        <li>PUT: Sunucudaki bir kaynağı güncellemek için kullanılır. Bu istekler de genellikle üzerilerinde değiştirilmek istenen bilgiyi taşırlar.</li>
        <li>PATCH: Bu metot da sunucudaki bir kaynağı değiştirmek için kullanılır. Put ile arasındaki fark ise Put sunucudaki kaynağı yeni bir kaynak ile değiştirmek için kullanılır iken, Patch bu kaynağında bir kısmını değiştirmeye yarar.</li>
        <li>DELETE: Sunucudaki bir kaynağı silmeye yarar.</li>
      </ul>
      <p>Daha az kullanılan metotlar ise aşağıdaki gibidir:</p>
      <ul>
        <li>CONNECT: Sunucu ile bir bağlantı oluşturma isteği gönderir. Sunucu bağlantılarını minimum yük ile test etme olanağı sağlar.</li>
        <li>HEAD : Sunucuya aynı Get metodu gibi ancak sadece başlığı olan (Request Header), gövdesi olmayan(Request Body) bir istek gönderir. Genellikle sunucuda bir kaynak mevcut mu veya kaynağın en son güncellenme bilgisi için kullanılır.</li>
        <li>OPTİONS: Sunucunun desteklediği metotları kontrol etmek için kullanılır.</li>
        <li>TRACE: Bu metod ile bir sunucuya istek gönderdiğinizde, aradaki tüm vekil sunucular (Proxy, Gateway) isteğin başlığına kendi IP veya DNS biglilerini eklerler. Genellikle hata ayıklama/bakım işleri için kullanılır.</li>
      </ul>
      <p>Yukarıdaki örnek requestte bulunulan object /somedir/page.html dir. Bu örnekte browser HTTP/1.1 versiyonunu kullanıyor.</p>
      <p><strong>Header satırları;</strong></p>
      <ul>
        <li>Host: www.someschool.edu: Objectin bulunduğu hostu belirtir.</li>
        <li>connection: close : Browser, sunucuya kalıcı bağlantılarla uğraşmak istemediğini söylüyor; istenen nesneyi gönderdikten sonra sunucunun bağlantıyı kapatmasını ister.</li>
        <li>User-Agent: Sunucuya istekte bulunan Browser türünü belirtir. Burada user-agent bir Firefox browserı olan Mozilla/5.0'dır. Bu Header satırı faydalıdır çünkü server aslında aynı objectin farklı sürümlerini farklı türde user-agentlerına gönderebilir.</li>
        <li>Accept-language: başlık, sunucuda böyle bir nesne varsa, kullanıcının nesnenin Fransızca bir sürümünü almayı tercih ettiğini belirtir; aksi takdirde, sunucu varsayılan sürümünü göndermelidir.</li>
      </ul>
      <p>Yukarıdaki örneği inceledikten sonra şimdi http requestin genel formatına bakalım.</p>
      <p>ancak, başlık satırlarından (ve ek satır başı ve satır beslemesinden) sonra bir “entity body” vardır. Entity body, GET yöntemiyle boştur, ancak POST yöntemiyle kullanılır. Bir HTTP clientı, kullanıcı bir formu doldurduğunda (örneğin, bir kullanıcı bir arama motoruna arama sözcükleri yazdığında) genellikle POST yöntemini kullanır. Bir POST mesajıyla, kullanıcı hala bir serverdaki Web sayfasına istekte bulunuyor. Ancak Web sayfasının belirli içeriği kullanıcının form alanıne ne girdiğine bağlı. Eğer method değeri POST ise entitiy body kullanıcının girmiş olduğu değereleri barındırır.</p>
      <img src="images/blog/1/3.png" alt="HTTP POST Method" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <p>HTML formları genellikle GET yöntemini kullanır ve girilen verileri (form alanlarında) istenen URL’ye dahil eder. Örneğin, bir form GET yöntemini kullanıyorsa, iki tane alana sahipse ve iki alana girişler monkeys ve bananas ise, URL şöyle bir yapıya sahip olacaktır. www.somesite.com/animalsearch?monkeys&bananas.</p>
      <p>Şimdi HTTP Response mesajını inceleyelim.</p>
      <img src="images/blog/1/4.png" alt="HTTP Response Message" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <p>Durum satırında 3 farklı bölüm görüyoruz. 6 tane Header satırı ve son olarak entitiy body yi görüyoruz. Durum satırında üç alan vardır: protokol sürüm alanı, durum kodu ve ilgili durum mesajı.</p>
      <p>Bu örnekte durum satırı, sunucunun HTTP/1.1 kullandığını ve her şeyin yolunda olduğunu (yani, sunucunun istenen nesneyi bulduğunu ve gönderdiğini) gösterir.</p>
      <p><strong>Header satırlarına bir göz atalım.</strong></p>
      <ul>
        <li>Connection:close : Server burada clinet’a mesajı gönderdikten sonra TCP bağlantısını kapatacağını söylüyor.</li>
        <li>Date: HTTP yanıtının oluşturulduğu ve sunucu tarafından gönderildiği saati ve tarihi gösterir. unutmayın ki bu nesnenin oluşturulduğu veya en son değiştirildiği zaman değildir; serverın nesneyi dosya sisteminden aldığı, nesneyi yanıt mesajına eklediği ve yanıt mesajını gönderdiği zamandır.</li>
        <li>The Server: Mesajın bir Apache Web tarafından oluşturulduğunu gösterir sunucu; HTTP request mesajındaki User-agent başlık satırına benzer.</li>
        <li>Last-Modified: Üstbilgisi, nesne önbelleğe alma için kritiktir, hem yerel istemci ve ağ önbellek sunucularında (proxy sunucuları olarak da bilinir).</li>
        <li>Content-Length: başlık satırı, gönderilen nesnedeki bayt sayısını gösterir.</li>
        <li>Content-Type: başlık satırı, varlık gövdesindeki nesnenin HTML metni olduğunu gösterir.</li>
      </ul>
      <h3>HTTP durum kodları</h3>
      <ul>
        <li>1xx Bilgilendirici</li>
        <li>2xx Başarı</li>
        <li>3xx Yönlendirme</li>
        <li>4xx İstemci Hatası</li>
        <li>5xx Sunucu Hatası olduklarını temsil ederler. xx burada 00–99 arasında sayılardır.</li>
      </ul>
      <p>En çok karşılaşılan kodlar aşağıdaki gibidir.</p>
      <ul>
        <li>HTTP Status Code 200 — OK.</li>
        <li>HTTP Status Code 301 — Permanent Redirect.</li>
        <li>HTTP Status Code 302 — Temporary Redirect.</li>
        <li>HTTP Status Code 404 — Not Found.</li>
        <li>HTTP Status Code 410 — Gone.</li>
        <li>HTTP Status Code 500 — Internal Server Error.</li>
        <li>HTTP Status Code 503 — Service Unavailable.</li>
      </ul>
      <h3>HTTPS</h3>
      <p>Hypertext transfer protocol secure (HTTPS) bir web tarayıcısı ile bir web sitesi arasında veri göndermek için kullanılan birincil protokol olan HTTP’nin güvenli sürümüdür. Veri aktarımının güvenliğini artırmak için HTTPS şifrelenir. Bu, özellikle kullanıcılar bir banka hesabına, e-posta hizmetine veya sağlık sigortası sağlayıcısına giriş yapmak gibi hassas verileri iletirken önemlidir.</p>
      <p>Herhangi bir web sitesi, özellikle oturum açma kimlik bilgileri gerektirenler, HTTPS kullanmalıdır. Chrome gibi modern web tarayıcılarında, HTTPS kullanmayan web siteleri, diğerlerinden farklı olarak işaretlenir. Web sayfasının güvenli olduğunu belirtmek için URL çubuğunda yeşil bir asma kilit arayın. Web tarayıcıları HTTPS’yi ciddiye alır; Google Chrome ve diğer tarayıcılar, HTTPS olmayan tüm web sitelerini güvenli değil olarak işaretler.</p>
      <img src="images/blog/1/5.png" alt="HTTPS Not Secure Warning" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <h4>HTTPS nasıl çalışır?</h4>
      <p>HTTPS, iletişimları şifrelemek için bir şifreleme protokolü kullanır. Önceden Secure Sockets Layer (SSL) olarak bilinmesine rağmen, protokole Transport Layer Security (TLS) adı verilir. Bu protokol, asimetrik ortak anahtar altyapısı olarak bilinen şeyi kullanarak iletişimi güvence altına alır. Bu tür güvenlik sistemi, iki taraf arasındaki iletişimi şifrelemek için iki farklı anahtar kullanır:</p>
      <ul>
        <li><strong>Private Key</strong> — Bu key, bir web sitesinin sahibi tarafından kontrol edilir ve okuyucunun tahmin ettiği gibi gizli tutulur. Bu key bir web sunucusunda bulunur ve public key tarafından şifrelenen bilgilerin şifresini çözmek için kullanılır.</li>
        <li><strong>Public key</strong> — Bu key, sunucuyla güvenli bir şekilde etkileşim kurmak isteyen herkes tarafından kullanılabilir. Public key tarafından şifrelenen bilgilerin şifresi yalnızca private key tarafından çözülebilir.</li>
      </ul>
      <h3>SSL nedir?</h3>
      <p>SSL veya Secure Sockets Layer , şifreleme tabanlı bir İnternet güvenlik 443 portunda çalışan protokolüdür. İlk olarak 1995 yılında Netscape tarafından İnternet iletişiminde gizlilik, kimlik doğrulama ve veri bütünlüğünü sağlamak amacıyla geliştirilmiştir. SSL, günümüzde kullanılan modern TLS şifrelemesinin öncülüdür. SSL/TLS uygulayan bir web sitesinin URL’sinde “HTTP” yerine “HTTPS” bulunur.</p>
      <img src="images/blog/1/6.png" alt="HTTPS URL" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <h4>SSL/TLS nasıl çalışır?</h4>
      <p>Yüksek derecede gizlilik sağlamak için SSL, web üzerinden iletilen verileri şifreler. Bunun anlamı,bu verileri ele geçirmeye çalışan herkesin yalnızca şifresini çözmesi neredeyse imkansız olan bozuk bir karakter karışımını göreceği anlamına gelir.<br>
      SSL, her iki cihazın da gerçekten iddia ettikleri kişi olduğundan emin olmak için iki iletişim cihazı arasında el sıkışma adı verilen bir kimlik doğrulama işlemi başlatır.<br>
      SSL ayrıca, veri bütünlüğünü sağlamak için verileri dijital olarak imzalar ve hedeflenen alıcıya ulaşmadan önce verilerin kurcalanmadığını doğrular.<br>
      Her biri bir öncekinden daha güvenli olan birkaç SSL yinelemesi olmuştur. 1999'da SSL, TLS olacak şekilde güncellendi.</p>
      <h4>SSL ve TLS aynı şeyler mi?</h4>
      <p>SSL, TLS (Transport Layer Security) adı verilen başka bir protokolün doğrudan öncülüdür. 1999'da Internet Engineering Task Force (IETF) SSL için bir güncelleme önerdi. Bu güncelleme IETF tarafından geliştirildiğinden ve Netscape artık dahil olmadığı için adı TLS olarak değiştirildi. SSL’nin son sürümü (3.0) ile TLS’nin ilk sürümü arasındaki farklar çok büyük değildir; isim değişikliği, mülkiyet değişikliğini belirtmek için uygulandı.</p>
      <p>Çok yakından ilişkili olduklarından, iki terim genellikle birbirinin yerine kullanılır ve karıştırılır. Bazı insanlar hala TLS’ye atıfta bulunmak için SSL kullanıyor, diğerleri ise “SSL/TLS şifrelemesi” terimini kullanıyor çünkü SSL hala çok fazla isim tanıma özelliğine sahip.</p>
      <h4>SSL Sertifikası nedir?</h4>
      <p>SSL yalnızca SSL sertifikasına (teknik olarak bir “TLS sertifikası”) sahip web siteleri tarafından uygulanabilir. SSL sertifikası, birinin söylediği kişi olduğunu kanıtlayan bir kimlik kartı veya rozet gibidir. SSL sertifikaları, bir web sitesinin veya uygulamanın sunucusu tarafından Web’de depolanır ve görüntülenir.</p>
      <p>Bir SSL sertifikasındaki en önemli bilgilerden biri web sitesinin public keyidir. public key, şifrelemeyi mümkün kılar. Bir kullanıcının cihazı public key görüntüler ve bunu web sunucusuyla güvenli şifreleme anahtarları oluşturmak için kullanır. Bu arada web sunucusunun da gizli tutulan bir private key vardır; private key, public key ile şifrelenmiş verilerin şifresini çözer.</p>
      <p>Sertifika yetkilileri (CA), SSL sertifikalarının verilmesinden sorumludur.</p>
      <h4>SSL Sertifika türleri nelerdir?</h4>
      <p>Birkaç farklı SSL sertifikası türü vardır. Bir sertifika, türüne bağlı olarak tek bir web sitesine veya birkaç web sitesine uygulanabilir:</p>
      <ul>
        <li><strong>Single-Domain:</strong> SSL sertifikası yalnızca bir domain için geçerlidir (“alan”, www.cloudflare.com gibi bir web sitesinin adıdır).</li>
        <li><strong>Wildcard:</strong> bir SSL sertifikası yalnızca bir alan için geçerlidir. Ancak, o alanın alt alanlarını da içerir. Örneğin, bir wildcard sertifika www.cloudflare.com, blog.cloudflare.com ve geliştiriciler.cloudflare.com’u kapsayabilirken, single-domain bir sertifika yalnızca ilkini kapsayabilir.</li>
        <li><strong>Multi-Domain:</strong> Adından da anlaşılacağı gibi, çok alanlı SSL sertifikaları, birbiriyle alakasız birden çok alan adına uygulanabilir.</li>
      </ul>
      <p>SSL sertifikaları ayrıca farklı doğrulama seviyeleriyle gelir. Doğrulama seviyesi, arka plan kontrolü gibidir ve seviye, kontrolün eksiksizliğine bağlı olarak değişir.</p>
      <ul>
        <li><strong>Domain Validation:</strong> Bu, doğrulamanın en alt kat seviyesi ve en ucuzudur. Bir işletmenin yapması gereken tek şey, etki alanını kontrol ettiklerini kanıtlamaktır.</li>
        <li><strong>Organization Validation:</strong> Bu daha uygulamalı bir süreçtir: CA, sertifikayı talep eden kişi veya işletmeyle doğrudan iletişime geçer. Bu sertifikalar kullanıcılar için daha güvenilirdir.</li>
        <li><strong>Extended Validaton:</strong> Bu, SSL sertifikası verilmeden önce bir kuruluşun tam arka plan kontrolünü gerektirir.</li>
      </ul>
      <h3>SSH</h3>
      <p>Secure Shell veya Secure Socket Shell olarak da bilinen SSH, kullanıcılara, özellikle sistem yöneticilerine, güvenli olmayan bir ağ üzerinden bir bilgisayara güvenli bir şekilde erişmelerini sağlayan bir ağ protokolüdür.</p>
      <p>SSH ayrıca SSH protokolünü uygulayan yardımcı programlar paketini de ifade eder. Secure Shell, internet gibi açık bir ağ üzerinden bağlanan iki bilgisayar arasında şifreli veri iletişiminin yanı sıra güçlü parola kimlik doğrulaması ve public key kimlik doğrulaması sağlar.</p>
      <p>Güçlü şifreleme sağlamanın yanı sıra SSH, ağ yöneticileri tarafından sistemleri ve uygulamaları uzaktan yönetmek için yaygın olarak kullanılır, bu da onların bir ağ üzerinden başka bir bilgisayarda oturum açmalarını, komutları yürütmelerini ve dosyaları bir bilgisayardan diğerine taşımalarını sağlar.</p>
      <p>Bir SSH sunucusu, varsayılan olarak, standart Transmission Control Protocol (TCP) port 22'yi dinler.</p>
      <h4>SSH nasıl çalışır?</h4>
      <p>Secure Shell, Telnet, rlogin (remote login) ve rsh (remote shell) gibi güvenli olmayan terminal emulation veya login programlarının yerini almak için oluşturulmuştur. SSH aynı işlevleri etkinleştirir — uzak sistemlerde oturum açma ve terminal oturumlarını çalıştırma-. SSH ayrıca Dosya Aktarım Protokolü (FTP) ve rcp (remote copy) gibi dosya aktarım programlarının yerini alır.</p>
      <p>SSH’nin en temel kullanımı, bir terminal oturumu için uzak bir ana bilgisayara bağlanmaktır. Bu komut aşağıdaki gibidir:</p>
      <pre><code>ssh UserName@SSHserver.example.com</code></pre>
      <p>Bu komut, istemcinin UserName kullanıcı kimliğini kullanarak server.example.com adlı servera bağlanmaya çalışmasına sebep olur. Local host ile server arasında ilk kez bir bağlantı oluşturulmak isteniyorsa, kullanıcıdan remote host a public key fingerprint izni istenir.</p>
      <pre><code>The authenticity of host 'sample.ssh.com' cannot be established.
 DSA key fingerprint is 01:23:45:67:89:ab:cd:ef:ff:fe:dc:ba:98:76:54:32:10.
 Are you sure you want to continue connecting (yes/no)?</code></pre>
      <p>Komut istemine evet yanıtı vermek oturumun devam etmesine sağlar. ve hosy key local system’s known_hosts dosyasında saklanır. Bu, varsayılan olarak kullanıcının ana dizininde /.ssh/known_hosts adlı gizli bir dizinde depolanan gizli bir dosyadır. Host Key I bilinen_anasistemler dosyasında saklandıktan sonra, istemci sistemi herhangi bir onay gerekmeden doğrudan bu server a yeniden bağlanabilir; host key, bağlantı kimliğini doğrular.</p>
      <h4>SSH vs. SSL/TLS</h4>
      <p>Transport Layer Security (TLS) protokolü, — Secure Socekts Layer (SSL) protokolünün güncel hali- Transport katmanındaki ağ aktarımları için güvenlik sağlamak üzere tasarlanmıştır. SSH protokolü de transport katmanında veya hemen üstünde çalışır, ancak iki protokol arasında önemli farklılıklar vardır.</p>
      <p>Her ikisi de ana bilgisayarların kimliğini doğrulamak için public/private key çiftlerine güvenirken, TLS kapsamında yalnızca serverın kimliği bir key çiftleri ile doğrulanır. SSH, her bağlantının kimliğini doğrulamak için ayrı bir key çiftlerini kullanır: local makineden remote makineye bağlantı için bir key çifti ve remote makineden local makineye bağlantının kimliğini doğrulamak için ikinci bir key çifti kullanılır.</p>
      <p>SSH ve TLS arasındaki diğer bir fark, TLS’nin bağlantıların kimlik doğrulama olmadan şifrelenmesine veya şifreleme olmadan kimlik doğrulamasının yapılmasına olanak sağlamasıdır. SSH, tüm bağlantıları şifreler ve doğrular.</p>
      <p>SSH, BT ve bilgi güvenliği (infosec) uzmanlarına, SSH istemcilerini uzaktan yönetmek için güvenli bir mekanizma sağlar. SSH client ve server arasında bir bağlantı başlatmak için parola doğrulaması gerektirmek yerine, SSH aygıtların kimliğini doğrular. Bu, BT personelinin uzak sistemlerle bağlantı kurmasına ve known_hosts dosyasındaki host key çiftlerini ekleme veya kaldırma dahil olmak üzere SSH yapılandırmalarını değiştirmesine olanak tanır.</p>
      <h4>Kaynaklar</h4>
      <div class="blog-sources">
        <h4>Kitap</h4>
        <ul>
          <li>Computer Networking: A Top-Down Approach (7th Edition) — Kurose & Ross</li>
        </ul>
        <h4>Web Kaynakları</h4>
        <ul>
          <li><a href="https://www.cloudflare.com/learning/ssl/what-is-https/" target="_blank">Cloudflare - What is HTTPS?</a></li>
          <li><a href="https://www.cloudflare.com/learning/ssl/what-is-ssl/" target="_blank">Cloudflare - What is SSL?</a></li>
          <li><a href="https://www.techtarget.com/searchsecurity/definition/Secure-Shell" target="_blank">TechTarget - Secure Shell</a></li>
        </ul>
      </div>
      <div class="blog-tags">
        <span class="blog-tag">HTTPS</span>
        <span class="blog-tag">HTTP Request</span>
        <span class="blog-tag">SSH</span>
        <span class="blog-tag">SSL</span>
        <span class="blog-tag">TLS</span>
      </div>
    `,
    en: `
     <h2>HTTP, HTTPS, SSL/TLS, SSH</h2>
      <h3>Web and HTTP</h3>
      <p>Until the early 1990s, the Internet was primarily used by researchers, academics, and university students. It was used for logging into remote hosts, transferring files from local hosts to remote hosts and vice versa, sending and receiving news, and sending and receiving electronic mail. That was until the WWW (World Wide Web) emerged. The Web was the first Internet application to capture the public's attention. It significantly changed how people interact within and outside their work environments and continues to do so. Perhaps what appeals most to users is that the Web works on demand. Users get what they want whenever they want it. This is the exact opposite of TV and Radio broadcasts. The Web has turned everyone into a publisher. Search engines have enabled us to navigate the web ocean. Forms, JavaScript, Java applications, and many other tools allow us to interact with pages and sites. And Web protocols serve as a platform for YouTube, Web-based email (like Gmail), and most mobile Internet applications, such as Instagram and Google Maps.</p>
      <h3>HTTP Overview</h3>
      <p>Hyper Text Transfer Protocol (HTTP) is a protocol that operates at the application layer of the web using port 80. We can call it the heart of the Web. HTTP is implemented in two programs: the client program and the server program. The Server and Client communicate by exchanging HTTP messages through end systems. The structure of these messages is defined by HTTP. Before diving into the details of HTTP, let's examine some web terminology. A Web page (also called a document) consists of objects. An object is simply a file—such as HTML, JPEG, video-clip, etc.—that is addressable by a single URL.</p>
      <p>Mostly, a web page consists of a base HTML file and many different objects. For example, if a Web page has 1 HTML file and 5 JPEG files, there are a total of 6 objects on this web page. The base HTML file references other objects on the page using their URLs. Each URL has two components: hostname and pathname. For example: http://www.someSchool.edu/someDepartment/picture.gif In this URL, www.someSchool.edu is the hostname, and /someDepartment/picture.gif is the pathname. Web Browsers implement the Client side of HTTP, while Web Servers implement the Server side. HTTP defines how Web clients request Web pages from Web servers and how servers transfer Web pages to clients. When a Client makes a request (for example, by clicking a link), the Browser sends an HTTP Request message to the server for the objects on the page. When the Server receives the request message, it sends an HTTP Response message back to the browser.</p>
      <p>HTTP uses TCP as its primary transport protocol. The HTTP client first initiates a TCP connection with the server. Once the connection is established, the browser and server processes access TCP through their socket interfaces. On the client side, the socket interface is the gate between the client process and the TCP connection; on the server side, it is the gate between the server process and the TCP connection. The Client sends HTTP request messages to the socket interface and receives HTTP response messages from the socket interface.</p>
      <img src="images/blog/1/1.png" alt="HTTP Socket Interface" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <p>Similarly, the HTTP server receives request messages from the socket interface and sends response messages to the socket interface. Once the client sends a message to the socket interface, the message is out of the client's hands and in the hands of TCP. TCP provides a reliable data transfer service to HTTP. This means that every HTTP request message sent by a client process eventually reaches the server intact; similarly, every HTTP response message sent by the server process eventually reaches the client in full. Here we see a major advantage of layered architecture. HTTP does not deal with data loss; this task is handled by TCP.</p>
      <h3>HTTP Message Formats</h3>
      <p>There are two different message formats: Response message and Request message.</p>
      <img src="images/blog/1/2.png" alt="HTTP Message Formats" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <small>HTTP Request Message Structure</small>
      <p>First, we see that the message is written in ordinary ASCII text; even an average computer user can read it. Second, we see that the message consists of five lines, each followed by a carriage return and a line feed. This request message consists of 5 lines, but it can consist of more.</p>
      <p>The first line of an HTTP request message is called the request line. The subsequent lines are called Header Lines. The request line consists of 3 fields: the Method field, the URL field, and the HTTP version field.</p>
      <p>The method field can take values such as GET, POST, PUT, DELETE, and HEAD. The most commonly used are GET and POST. GET is used when a browser requests an object.</p>
      <ul>
        <li>PUT: Used to update a resource on the server. These requests also usually carry the information intended to be changed.</li>
        <li>PATCH: This method is also used to modify a resource on the server. The difference from Put is that Put is used to replace the resource on the server with a new one, while Patch is used to change a part of that resource.</li>
        <li>DELETE: Used to delete a resource on the server.</li>
      </ul>
      <p>Less commonly used methods are as follows:</p>
      <ul>
        <li>CONNECT: Sends a request to establish a connection with the server. It allows testing server connections with minimum load.</li>
        <li>HEAD: Sends a request to the server just like the Get method, but it only has a header (Request Header) and no body (Request Body). It is usually used to check if a resource exists on the server or for the resource's latest update information.</li>
        <li>OPTIONS: Used to check which methods the server supports.</li>
        <li>TRACE: When you send a request to a server with this method, all intermediate proxy servers (Proxy, Gateway) add their own IP or DNS information to the request header. It is generally used for debugging/maintenance tasks.</li>
      </ul>
      <p>In the example request above, the requested object is /somedir/page.html. In this example, the browser is using HTTP/1.1 version.</p>
      <p><strong>Header lines;</strong></p>
      <ul>
        <li>Host: www.someschool.edu: Specifies the host where the object is located.</li>
        <li>Connection: close: The browser is telling the server it does not want to deal with persistent connections; it wants the server to close the connection after sending the requested object.</li>
        <li>User-Agent: Specifies the type of Browser making the request to the server. Here, the user-agent is Mozilla/5.0, which is a Firefox browser. This Header line is useful because the server can actually send different versions of the same object to different types of user-agents.</li>
        <li>Accept-language: The header indicates that if such an object exists on the server, the user prefers to receive a French version of the object; otherwise, the server should send its default version.</li>
      </ul>
      <p>After examining the example above, let's look at the general format of an HTTP request.</p>
      <p>However, after the header lines (and the additional carriage return and line feed), there is an "entity body." The entity body is empty with the GET method but is used with the POST method. An HTTP client typically uses the POST method when a user fills out a form (for example, when a user types search terms into a search engine). With a POST message, the user is still requesting a Web page on a server. However, the specific content of the Web page depends on what the user entered in the form fields. If the method value is POST, the entity body contains the values entered by the user.</p>
      <img src="images/blog/1/3.png" alt="HTTP POST Method" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <p>HTML forms usually use the GET method and include the entered data (in the form fields) in the requested URL. For example, if a form uses the GET method, has two fields, and the entries for the two fields are "monkeys" and "bananas," the URL will have a structure like: www.somesite.com/animalsearch?monkeys&bananas.</p>
      <p>Now let's examine the HTTP Response message.</p>
      <img src="images/blog/1/4.png" alt="HTTP Response Message" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <p>In the status line, we see 3 different sections. We see 6 Header lines and finally the entity body. There are three fields in the status line: the protocol version field, the status code, and the corresponding status message.</p>
      <p>In this example, the status line indicates that the server is using HTTP/1.1 and that everything is okay (meaning the server found and sent the requested object).</p>
      <p><strong>Let's take a look at the Header lines.</strong></p>
      <ul>
        <li>Connection: close: The server is telling the client that it will close the TCP connection after sending the message.</li>
        <li>Date: Indicates the time and date when the HTTP response was created and sent by the server. Note that this is not the time the object was created or last modified; it is the time the server retrieved the object from the file system, attached it to the response message, and sent the response message.</li>
        <li>The Server: Indicates that the message was generated by an Apache Web server; similar to the User-agent header line in the HTTP request message.</li>
        <li>Last-Modified: This header is critical for object caching, both on local clients and network cache servers (also known as proxy servers).</li>
        <li>Content-Length: The header line indicates the number of bytes in the sent object.</li>
        <li>Content-Type: The header line indicates that the object in the entity body is HTML text.</li>
      </ul>
      <h3>HTTP Status Codes</h3>
      <ul>
        <li>1xx Informational</li>
        <li>2xx Success</li>
        <li>3xx Redirection</li>
        <li>4xx Client Error</li>
        <li>5xx Server Error. xx here represents numbers between 00–99.</li>
      </ul>
      <p>The most commonly encountered codes are as follows.</p>
      <ul>
        <li>HTTP Status Code 200 — OK.</li>
        <li>HTTP Status Code 301 — Permanent Redirect.</li>
        <li>HTTP Status Code 302 — Temporary Redirect.</li>
        <li>HTTP Status Code 404 — Not Found.</li>
        <li>HTTP Status Code 410 — Gone.</li>
        <li>HTTP Status Code 500 — Internal Server Error.</li>
        <li>HTTP Status Code 503 — Service Unavailable.</li>
      </ul>
      <h3>HTTPS</h3>
      <p>Hypertext Transfer Protocol Secure (HTTPS) is the secure version of HTTP, which is the primary protocol used to send data between a web browser and a website. HTTPS is encrypted to increase the security of data transfer. This is especially important when users transmit sensitive data, such as logging into a bank account, email service, or health insurance provider.</p>
      <p>Any website, especially those requiring login credentials, should use HTTPS. In modern web browsers like Chrome, websites that do not use HTTPS are marked differently from others. Look for a green padlock in the URL bar to indicate that the web page is secure. Web browsers take HTTPS seriously; Google Chrome and other browsers mark all non-HTTPS websites as not secure.</p>
      <img src="images/blog/1/5.png" alt="HTTPS Not Secure Warning" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <h4>How does HTTPS work?</h4>
      <p>HTTPS uses an encryption protocol to encrypt communications. Although previously known as Secure Sockets Layer (SSL), the protocol is now called Transport Layer Security (TLS). This protocol secures communication using what is known as an asymmetric public key infrastructure. This type of security system uses two different keys to encrypt communication between two parties:</p>
      <ul>
        <li><strong>Private Key</strong> — This key is controlled by the owner of a website and is kept private, as the reader might guess. This key resides on a web server and is used to decrypt information encrypted by the public key.</li>
        <li><strong>Public key</strong> — This key is available to anyone who wants to interact with the server securely. Information encrypted by the public key can only be decrypted by the private key.</li>
      </ul>
      <h3>What is SSL?</h3>
      <p>SSL, or Secure Sockets Layer, is an encryption-based Internet security protocol operating on port 443. It was originally developed by Netscape in 1995 to ensure privacy, authentication, and data integrity in Internet communications. SSL is the predecessor to the modern TLS encryption used today. A website that implements SSL/TLS has "HTTPS" in its URL instead of "HTTP."</p>
      <img src="images/blog/1/6.png" alt="HTTPS URL" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
      <h4>How does SSL/TLS work?</h4>
      <p>To provide a high degree of privacy, SSL encrypts data transmitted over the web. This means that anyone trying to intercept this data will only see a scrambled mix of characters that is nearly impossible to decrypt.<br>
      SSL initiates an authentication process called a handshake between two communicating devices to ensure that both devices are truly who they claim to be.<br>
      SSL also digitally signs data to provide data integrity, verifying that the data has not been tampered with before reaching its intended recipient.<br>
      There have been several iterations of SSL, each more secure than the last. In 1999, SSL was updated to become TLS.</p>
      <h4>Are SSL and TLS the same?</h4>
      <p>SSL is the direct predecessor to another protocol called TLS (Transport Layer Security). In 1999, the Internet Engineering Task Force (IETF) proposed an update to SSL. Since this update was developed by the IETF and Netscape was no longer involved, the name was changed to TLS. The differences between the final version of SSL (3.0) and the first version of TLS are not very large; the name change was applied to signify the change in ownership.</p>
      <p>Because they are so closely related, the two terms are often used interchangeably and confused. Some people still use SSL to refer to TLS, while others use the term "SSL/TLS encryption" because SSL still has a lot of brand recognition.</p>
      <h4>What is an SSL Certificate?</h4>
      <p>SSL can only be implemented by websites that have an SSL certificate (technically a "TLS certificate"). An SSL certificate is like an ID card or a badge proving that someone is who they say they are. SSL certificates are stored and displayed on the Web by a website's or application's server.</p>
      <p>One of the most important pieces of information in an SSL certificate is the website's public key. The public key makes encryption possible. A user's device views the public key and uses it to establish secure encryption keys with the web server. Meanwhile, the web server also has a private key that is kept secret; the private key decrypts data encrypted with the public key.</p>
      <p>Certificate Authorities (CA) are responsible for issuing SSL certificates.</p>
      <h4>What are the types of SSL Certificates?</h4>
      <p>There are several different types of SSL certificates. A certificate can be applied to a single website or several websites, depending on its type:</p>
      <ul>
        <li><strong>Single-Domain:</strong> An SSL certificate is valid for only one domain ("domain" is the name of a website, such as www.cloudflare.com).</li>
        <li><strong>Wildcard:</strong> An SSL certificate is valid for only one domain, but it also includes the subdomains of that domain. For example, a wildcard certificate could cover www.cloudflare.com, blog.cloudflare.com, and developers.cloudflare.com, whereas a single-domain certificate could only cover the first one.</li>
        <li><strong>Multi-Domain:</strong> As the name suggests, multi-domain SSL certificates can be applied to multiple unrelated domain names.</li>
      </ul>
      <p>SSL certificates also come with different validation levels. The validation level is like a background check, and the level varies depending on the thoroughness of the check.</p>
      <ul>
        <li><strong>Domain Validation:</strong> This is the lowest level of validation and the cheapest. All a business needs to do is prove that they control the domain.</li>
        <li><strong>Organization Validation:</strong> This is a more hands-on process: the CA contacts the person or business requesting the certificate directly. These certificates are more trustworthy for users.</li>
        <li><strong>Extended Validation:</strong> This requires a full background check of an organization before an SSL certificate is issued.</li>
      </ul>
      <h3>SSH</h3>
      <p>SSH, also known as Secure Shell or Secure Socket Shell, is a network protocol that provides users, especially system administrators, with a secure way to access a computer over an insecure network.</p>
      <p>SSH also refers to the suite of utilities that implement the SSH protocol. Secure Shell provides strong password authentication and public key authentication, as well as encrypted data communications between two computers connecting over an open network like the internet.</p>
      <p>In addition to providing strong encryption, SSH is widely used by network administrators to manage systems and applications remotely, allowing them to log in to another computer over a network, execute commands, and move files from one computer to another.</p>
      <p>An SSH server, by default, listens on the standard Transmission Control Protocol (TCP) port 22.</p>
      <h4>How does SSH work?</h4>
      <p>Secure Shell was created to replace insecure terminal emulation or login programs such as Telnet, rlogin (remote login), and rsh (remote shell). SSH enables the same functions—logging into remote systems and running terminal sessions. SSH also replaces file transfer programs such as File Transfer Protocol (FTP) and rcp (remote copy).</p>
      <p>The most basic use of SSH is to connect to a remote host for a terminal session. The command is as follows:</p>
      <pre><code>ssh UserName@SSHserver.example.com</code></pre>
      <p>This command causes the client to attempt to connect to the server named server.example.com using the user ID UserName. If a connection is being established between the local host and the server for the first time, the user is asked for public key fingerprint permission for the remote host.</p>
      <pre><code>The authenticity of host 'sample.ssh.com' cannot be established.
 DSA key fingerprint is 01:23:45:67:89:ab:cd:ef:ff:fe:dc:ba:98:76:54:32:10.
 Are you sure you want to continue connecting (yes/no)?</code></pre>
      <p>Responding "yes" to the prompt allows the session to continue, and the host key is stored in the local system's known_hosts file. This is a hidden file stored in a hidden directory named /.ssh/known_hosts in the user's home directory by default. Once the host key is stored in the known_hosts file, the client system can reconnect directly to that server without any confirmation required; the host key verifies the connection identity.</p>
      <h4>SSH vs. SSL/TLS</h4>
      <p>The Transport Layer Security (TLS) protocol—the current version of the Secure Sockets Layer (SSL) protocol—is designed to provide security for network transfers at the transport layer. The SSH protocol also operates at the transport layer or just above it, but there are important differences between the two protocols.</p>
      <p>While both rely on public/private key pairs to authenticate hosts, under TLS, only the server's identity is authenticated with a key pair. SSH uses a separate key pair to authenticate each connection: one key pair for the connection from the local machine to the remote machine and a second key pair to authenticate the connection from the remote machine to the local machine.</p>
      <p>Another difference between SSH and TLS is that TLS allows connections to be encrypted without authentication or authentication to be performed without encryption. SSH encrypts and authenticates all connections.</p>
      <p>SSH provides IT and information security (infosec) professionals with a secure mechanism for managing SSH clients remotely. Instead of requiring password authentication to initiate a connection between an SSH client and server, SSH authenticates the devices. This allows IT personnel to establish connections with remote systems and change SSH configurations, including adding or removing host key pairs in the known_hosts file.</p>
      <h4>Sources</h4>
      <div class="blog-sources">
        <h4>Book</h4>
        <ul>
          <li>Computer Networking: A Top-Down Approach (7th Edition) — Kurose & Ross</li>
        </ul>
        <h4>Web Resources</h4>
        <ul>
          <li><a href="https://www.cloudflare.com/learning/ssl/what-is-https/" target="_blank">Cloudflare - What is HTTPS?</a></li>
          <li><a href="https://www.cloudflare.com/learning/ssl/what-is-ssl/" target="_blank">Cloudflare - What is SSL?</a></li>
          <li><a href="https://www.techtarget.com/searchsecurity/definition/Secure-Shell" target="_blank">TechTarget - Secure Shell</a></li>
        </ul>
      </div>
      <div class="blog-tags">
        <span class="blog-tag">HTTPS</span>
        <span class="blog-tag">HTTP Request</span>
        <span class="blog-tag">SSH</span>
        <span class="blog-tag">SSL</span>
        <span class="blog-tag">TLS</span>
      </div>
    `
  }
};