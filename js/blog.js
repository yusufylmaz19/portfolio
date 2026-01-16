// Blog Posts Data - Real Medium Articles by Yusuf Yılmaz
const blogPosts = [
  {
    id: 1,
    title: "HTTP, HTTPS, SSL/TLS, SSH",
    excerpt: "HTTP, HTTPS, SSL/TLS, SSH protokolleri ve webin temelleri hakkında detaylı, eksiksiz bir rehber.",
    date: "2022-07-28",
    readTime: "11 dk",
    mediumUrl: "",
    content: `
      <h2>HTTP, HTTPS, SSL/TLS,SSH</h2>
      <h3>Web ve HTTP</h3>
      <p>1990'ların başına kadar İnternet öncelikle araştırmacılar, akademisyenler ve üniversite öğrencileri tarafından kullanılıyordu. uzak ana bilgisayarlarda oturum açmak, yerel ana bilgisayarlardan uzak ana bilgisayarlara dosya aktarmak ve bunun tam tersi için, haber göndermek ve almak, elektronik posta almak ve göndermek için kullanılıyordu.Ta ki WWW (Wordl Wide Web) sahneye çıkana kadar. Web, halkın dikkatini çeken ilk İnternet uygulamasıydı. İnsanların çalışma ortamlarının içinde ve dışında nasıl etkileşime girdiğini önemli ölçüde değiştirdi ve değiştirmeye devam ediyor. Belki de kullanıcılara en çok hitap eden şey, Web’in talep üzerine çalışmasıdır. Kullanıcılar istedikleri zaman istedikleri şeyleri alırlar.bu Tv ve Radyo yayınlarının tam tersidir.Web herkesi bir yayıncı hale getirdi.Arama motorları web okyanusunda gezinmemizi sağladı. Formlar, JavaScript, Java uygulamaları ve diğer birçok cihaz sayfalar ve sitelerle etkileşim kurmamızı sağlar. Ve Web protokolleri, YouTube, Web tabanlı e-posta (Gmail gibi) ve çoğu mobil İnternet uygulaması, Instagram ve Google Haritalar için bir platform görevi görür.</p>
      <h3>HTTP’ye genel bakış</h3>
      <p>Hyper Text Transfer Protokol(HTTP) web’in uygulama katmanında 80 port numarası ile çalışan bir prokoldür. Web’in kalbi diyebiliriz. Http 2 programda uygulanır: istemci(client) programı ve sunucu(server) programı. Server ve Client, uç sistemleri çalıştırarak, http mesajlarını birbirleri ile değiştirerek mesajlaşırlar. Bu mesajların yapısı HTTP tarafından tanımlanır. HTTP’nin detaylarına inmeden önce bazı web terminolojini inceleyelim. Bir Web sayfası (document de denebilir) object (nesne) lerden oluşur.Bir objectkısaca html, jpeg video-clip vb- kısaca single URL ile adreslenebilir bir dosyadır.</p>
      <p>Çoğunlukla web sayfası temel bir HTML dosyasıdan ve birçok farklı objecten oluşur. Örnek olarak bir Web sayfasında 1 html 5 tane jpeg dosyası var ise bu web sayfasında toplamada 6 tane object vardır. Temel HTML dosyası, nesnelerin URL’leri ile sayfadaki diğer nesnelere başvurur.Her URL in 2 tane bileşeni vardır: hostname ve pathname. Örnek olarak: http://www.someSchool.edu/someDepartment/picture.gif Bu URL www.someSchool.edu hostname , /someDepartment/picture.gif ise pathnamedir.Web Browserlar HTTP’nin Client tarafını uygularken, Web Serverlar Server Tarafını uygular. HTTP, Web clientların Web serverından Web sayfalarını nasıl talep ettiğini ve serverların Web sayfalarını clientlara nasıl aktardığını tanımlar. Client bir Request te bulunduğunda (bir linke tıklarsa mesela) Browser, sayfadaki objectler için server a HTTP Request mesajı gönderir. Server, request mesajını aldığında bu mesaj için browser a http response ile response mesajı gönderir.</p>
      <p>HTTP, temel aktarım protokolü olarak TCP’yi kullanır. HTTP client i önce server ile bir TCP bağlantısı başlatır. Bağlantı kurulduğunda, browser ve server işlemleri TCP’ye kendi soket arayüzleri üzerinden erişim sağlar. Client tarafında, soket arabirimi, istemci işlemi ile TCP bağlantısı arasındaki kapıdır; server tarafında ise sunucu işlemi ile TCP bağlantısı arasındaki kapıdır. Client, HTTP istek mesajlarını soket arayüzüne gönderir ve HTTP yanıt mesajlarını soket arayüzünden alır.</p>
      <p>Benzer şekilde, HTTP server soket arayüzünden istek mesajları alır ve soket arayüzüne cevap mesajları gönderir. İstemci soket arayüzüne bir mesaj gönderdiğinde, mesaj artık clientın elinden çıkmış TCP’nin eline geçmiştir. TCP, HTTP’ye güvenilir bir veri aktarım hizmeti sağlar. Bu, şu anlama gelir: bir client işlemi tarafından gönderilen her HTTP istek mesajı, sonunda servera bozulmadan ulaşır; benzer şekilde, server işlemi tarafından gönderilen her HTTP yanıt mesajı, sonunda clienta eksiksiz olarak ulaşır. Burada katmanlı mimarini büyük bir avantajını görüyoruz. HTTP, datada oluşacak kayıp ile ilgilenmez, bu iş TCP tarafından gerçekleştirilir.</p>
      <h3>HTTP mesaj formatları</h3>
      <p>Response message ve Request message olmak üzere 2 farklı mesaj formatı vardır</p>
      <p><strong>HTTP Request Message yapısı</strong><br>
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
      <p>HTML formları genellikle GET yöntemini kullanır ve girilen verileri (form alanlarında) istenen URL’ye dahil eder. Örneğin, bir form GET yöntemini kullanıyorsa, iki tane alana sahipse ve iki alana girişler monkeys ve bananas ise, URL şöyle bir yapıya sahip olacaktır. www.somesite.com/animalsearch?monkeys&bananas.</p>
      <p>Şimdi HTTP Response mesajını inceleyelim.</p>
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
      <h4>HTTPS nasıl çalışır?</h4>
      <p>HTTPS, iletişimleri şifrelemek için bir şifreleme protokolü kullanır. Önceden Secure Sockets Layer (SSL) olarak bilinmesine rağmen, protokole Transport Layer Security (TLS) adı verilir. Bu protokol, asimetrik ortak anahtar altyapısı olarak bilinen şeyi kullanarak iletişimi güvence altına alır. Bu tür güvenlik sistemi, iki taraf arasındaki iletişimi şifrelemek için iki farklı anahtar kullanır:</p>
      <ul>
        <li><strong>Private Key</strong> — Bu key, bir web sitesinin sahibi tarafından kontrol edilir ve okuyucunun tahmin ettiği gibi gizli tutulur. Bu key bir web sunucusunda bulunur ve public key tarafından şifrelenen bilgilerin şifresini çözmek için kullanılır.</li>
        <li><strong>Public key</strong> — Bu key, sunucuyla güvenli bir şekilde etkileşim kurmak isteyen herkes tarafından kullanılabilir. Public key tarafından şifrelenen bilgilerin şifresi yalnızca private key tarafından çözülebilir.</li>
      </ul>
      <h3>SSL nedir?</h3>
      <p>SSL veya Secure Sockets Layer , şifreleme tabanlı bir İnternet güvenlik 443 portunda çalışan protokolüdür. İlk olarak 1995 yılında Netscape tarafından İnternet iletişiminde gizlilik, kimlik doğrulama ve veri bütünlüğünü sağlamak amacıyla geliştirilmiştir. SSL, günümüzde kullanılan modern TLS şifrelemesinin öncülüdür. SSL/TLS uygulayan bir web sitesinin URL’sinde “HTTP” yerine “HTTPS” bulunur.</p>
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
    `
  },
  {
    id: 2,
    title: "Git",
    excerpt: "Git ve versiyon kontrol sistemleri hakkında detaylı, eksiksiz bir rehber.",
    date: "2022-07-25",
    readTime: "9 dk",
    mediumUrl: "",
    content: `
      <h2>Git</h2>
      <p><strong>Yusuf Yılmaz</strong></p>
      <p>9 min read · Jul 25, 2022</p>
      <h3>Git Nedir?</h3>
      <p>Git, Linus Torvalds tarafından Linux un çekirdeğini geliştirmek üzere tasarlanıp kullanılan bir versiyon kontrol sistemidir. bi dk o da ne demek?</p>
      <p>Versiyon kontrol sistemleri, yazılım ekiplerinin zaman içinde yaptıkları değişikleri yönetmesine yarayan yazılım aracıdır. Yani projede yaptığınız değişikleri versiyonlama, Bu versiyonlar arasında dolaşmak için kullanılan bir yapıdır.</p>
      <p><strong>Git i bu kadar popüler yapan şey ne peki?</strong></p>
      <ul>
        <li>Hızlı olması</li>
        <li>Yüzlerce farklı branchde geliştirme ortamı sağlaması</li>
        <li>Büyük çaplı projelerde rahatlıkla çalışması</li>
        <li>Github gibi çok popüler bir yazılım mecrası tarafından kullanılması</li>
      </ul>
      <p>Git’i popüler yapan şeyler bunlar. Sende git kullanmayı öğrenmek istiyorsan hadi başlayalım.</p>
      <h4>wait wait wait</h4>
      <p>Başlamadan önce şu yapıyı öğrenirsek çok fazla işimize yarayacağına inanıyorum.</p>
      <p><strong>working directory</strong> e projemizin içinde olduğu klasör ortamı diyebiliriz.</p>
      <p><strong>staging area</strong> ya ise .git directory sine atmadan önce değişikliklerimizi beklettiğimiz alan olarak düşünebiliriz.</p>
      <p><strong>.git directory</strong> ise emin olduğumuz değişiklikleri içine atadığımız(commit) klasör diyebiliriz. daha sonra buradaki dosyalarımızı remote repolara atacağız tabi her şey burada bitmedi.</p>
      <p>Dediğimiz gibi git bir versiyon kontrol sistemi, hangi değişikliği kim yaptı bunu takip etmek için git in config ayarlarını yapmamız gerekiyor.</p>
      <p>command line ımızı açıyoruz.<br>
      Öncelikle git bilgisayarlarınızda yüklü değilse bu linkten download edip kurmanız gerekiyor.</p>
      <h4>git config</h4>
      <p>Yukarıda görüldüğü gibi git config ile email adresimizi git e söylemiş olduk.<br>
      Aynı şeyi name değişkeni içinde yapmamız lazım.</p>
      <pre><code>git config — global user.name ‘yourname’</code></pre>
      <h4>git init</h4>
      <p>Bu komut artık çalıştığımız klasörün bir git tarafından takip edilebileceğini ifade eder. Bulunduğumuz klasör içine .git uzantılı gizli boş bir klasör açar(.git directory).</p>
      <p>ls –a ile dizindeki tüm gizli ve açık içerikleri görmek istedik .git/ klasörü de karşımıza çıktı.</p>
      <h4>git add &lt;filename&gt;</h4>
      <p>Bu komut ile WD de yapmış olduğumuz değişikleri SA ya (index) kaydederiz.</p>
      <p>touch komutu ile 3 adet .txt uzantılı dosya oluşturduk.Bunları index’e kaydetmek için tek tek de ekleyebilirdik ya da son satırda olduğu gibi ’ git add .’ ile hepsini birden ekledik. Burada dikkat etmemiz gereken git in case sensitive olmasıdır.</p>
      <h4>.gitignore</h4>
      <p>Bu dosya hayati öneme sahip bir işlevsellik sağlıyor.bu dosya uzaktaki sunuculara yüklemek istemediğimiz dosyaların ve bilgileri mesela api keyimiz veya node modülelleri gibi dosyaların uzak sunuculara yüklenmesinin önüne geçmek için kullanılır.projemiz içinde .gitignore isimle bir file oluşturmamız, yüklenmesini istemediğimiz dosyların adını bu file içine yazmamız gerekmektedir.</p>
      <p>git in artık bu dosyalar ile bir ilişkisi yok</p>
      <h4>git status</h4>
      <p>Bu komut ile yaptığımız değişiklerin staging area daki durumu hakkında bilgi ediniriz.</p>
      <p>Görüldüğü gibi 3 yeni dosyayı index e eklemişim. birini silmiş diğer birini modifiye etmişim. Yukarıdaki açıklamalarda karşımıza iki öneri çıkıyor.</p>
      <ol>
        <li>git rm — -cached &lt;file&gt;<br>
        Komutunu kullanarak takip etmek istemediğimiz dosyayı unstage hale getirebiliriz. Eğer istersek tekrar git add komutunu kullanırız.</li>
        <li>git restore &lt;file&gt;<br>
        Komutunu kullanarak staged durumundaki dosyamızda yapmış olduğumuz değişikliği son committeki haline geri alabiliriz.</li>
      </ol>
      <h4>git commit</h4>
      <p>git add ile WD den index e eklemiştik dosyalarımız. şimdi bu dosyaları git commit kullanarak local repoya(.git directory e) aktaracağız. Bu işleme commit etme işlemi denir.</p>
      <p>-m ile commitimize mesaj özelliği ekleriz.</p>
      <h4>git log</h4>
      <p>Bu komut ile commit geçmişimize ulaşabiliriz.</p>
      <p>commit işleminde yazdığımız mesaj burada gözüküyor.<br>
      Görüldüğü gibi commit mesajı ile birlikte commit tarihi ve commiti atan kişi hakkında bilgileri ediniyoruz. Yukarıda 3 farklı kavram ile karşılaşıyoruz.</p>
      <ul>
        <li><strong>Hashcode:</strong> Her commitin uniqe bir hash değeri var ve biz bu hash değerleri ileride bahsedeceğim git’in diff, checkout, revert, reset vb. komutlarında kullanıyor olacağız.</li>
        <li><strong>Head:</strong> Nerede olduğumuzu gösterir.Bu bize genel olarak son commiti point eder. Yani son yaptığımız değişiklik Head lable’ı ile vurgulanır.</li>
        <li><strong>Branch:</strong> bu branchleri farklı bir çalışma klasörü olarak düşünebiliriz. Her projede birden fazla branch oluşturabilir bu branchlerde farklı yapılar geliştirebilir ve bu branchleri uygun anda (conflict olmadan) birleştirebiliriz(merge).</li>
      </ul>
      <h4>git branch</h4>
      <p>Komutu ile var olan branchleri görüntüleyebiliriz.</p>
      <pre><code>git branch &lt;branchname&gt;</code></pre>
      <p>Komutu ile yeni bir branch oluşturabilriz.</p>
      <h4>git switch &lt;branchname&gt;</h4>
      <p>Komutu ile branchler arsında geçiş yapabiliriz.</p>
      <h4>git branch -d &lt;branchname&gt;</h4>
      <p>Komutu ile açtığımız branchi delete edebiliriz</p>
      <p>Çoğu zaman birden fazla ekip üyesi ile çalıştığımız için farklı branchte çalışırız ve bu branchleri projenin ana branchi ile birleştirmek istediğimiz zaman git merge özelliğini kullanmamız gerekir.Bu noktada çok dikkatli davranmamız gerekir. Çünkü oluşacak conflictler projemizi çöp edebilir.</p>
      <p><strong>Bu conflictler neler olabilir.?</strong><br>
      Örnek olarak; master branchte açtığımız bir dosyayı feat branch inde değiştiririz ama bu dosyayı master içinde delete edersek bu bize bir conflict oluşturur. Git burada otomatik merge etme işlemini gerçekleştiremez. Bu conflicti yeni bir commit atarak düzeltebiliriz.</p>
      <h4>git merge</h4>
      <p>İki branchi biriyle birleştirmek için kullanılır.Eğer bir conflict yoksa merge işlemi başarılı olur.</p>
      <p>her harfi bir commit i her satırı bir branch i temsil eder.<br>
      Burada master branch de iken ‘git merge feat’ komutunu çalıştırısak feat branchimiz master ile birleşmiş olur ve aşağıdaki duruma gelir.</p>
      <p>h adında bir merge commit oluştu</p>
      <h4>Fast Forwad</h4>
      <p>Yeni bir branch açıp orada commit atmaya devam edersek ve master branchinde hiçbir değişiklik yapmazsak ve eğer biz bu branchleri merge etmek istersek hiç conflict olmadan birleşecekleri için fast forwarding yapmış oluruz.</p>
      <h4>git stash</h4>
      <p>Commit etmeye hazır olmadığımız durumlarda,<br>
      Branch değiştirmek zorunda olduğumuz durumlarda ve<br>
      Yaptığımız değişikleri kaydetmek istemediğimiz durumlarda<br>
      Değişiklik yaptığımız bilginin kaybolmaması için bu komut kullanılır.Yapılan değişikleri stash adını verdiğimiz bir hafıza bölgesinde saklanır.</p>
      <h4>git stash pop</h4>
      <p>Stash a eklediğimiz değişikliği geri getirmek için kullanılır.</p>
      <h4>git stash list</h4>
      <p>Bu komut ile stash deki tüm kayıtlarımıza erişebiliriz.</p>
      <h4>git stash apply</h4>
      <p>Bu komut ile stash deki tüm kayıtlarımızı ekleyebiliriz. yada komutun sonuna stash id sini ekleyerek tek tek ekleyebiliriz.</p>
      <h4>git stash clear</h4>
      <p>Bu komut ile stash deki tüm kayıtlarımızı temizleyebiliriz.</p>
      <h4>git checkout &lt;hashcode&gt;</h4>
      <p>Daha önce git add ile yaptığımız işlemlere geri dönmeyi öğrendik. Bu kez commitlere geri dönmeyi göreceğiz.Bu komut attığımız commitlere geri dönmemizi sağlar.</p>
      <p>Checkoutun yanına dönmek istediğimiz commitin hashini yazdık ve head durumu değişti. Git burada bize detached Head durum olduğunu söylüyor ve bunu düzeltmemizi istiyor.</p>
      <h4>Detached Head</h4>
      <p>Yukarıdaki şekilde görüldüğü gibi eğer biz C comitene dönersek Headimiz C yi point edecek ama D commiti bizim hala son commitimiz.</p>
      <p>Bu durumda DH den kurtulmak için yapabileceğimiz 2 şey var.</p>
      <ol>
        <li>master a geri dönerek bu durumu düzeltebiliriz. (git switch master)</li>
        <li>yeni bir branch açıp yolumuza oradan devam edebiliriz.</li>
      </ol>
      <pre><code>git branch feat > git switch feat > git add . > git commit</code></pre>
      <p>commit işlemlerinde geriye gitmek için bu log kayıtı takip edilmeli</p>
      <h4>git reset &lt;hashcode&gt;</h4>
      <p>Şuan 3. committeyim ve ben 2. ye dönmek istiyorum. Bu durumda=> git reset geriye dönmek istediğim noktayı(yani 2.commit hasini) yazarak ikiden onceki commitleri logdan silmiş oluyorum.</p>
      <p>Ama yaptığım değişikler hala dosyamın içinde kayıtlı halde duracak.Eğer her iki durumuda silmek istersem=> git reset –-hard &lt;hashcode&gt; şeklinde kodumu çalıştırmam gerekir.</p>
      <p>B commitine döndüm</p>
      <h4>git revert &lt;hashcode&gt;</h4>
      <p>3 commiti geri almak istiyorum ama commit loguna karışmak istemiyorum ve üstelik aynı branchdan de devam etmek istiyorum . Bu durumda=> git revert ‘geri almak istediğimiz commitin hasini (yani 3. commit hashi) ni yazarak geriye dönüp bunu yeni bir commit ile tamamlıyoruz.</p>
      <p>c commitini geri aldım ama c commit kaydı silinmedi ve revert yaptığıma dair yeni bir commit oluştu.</p>
      <h4>git diff</h4>
      <p>Hangi commitler arasında neleri değiştirdik,<br>
      Hangi commitler arasında ne olmuştu<br>
      Hangi branchler arasında ne olmuştu,<br>
      Working directory ve Staging area arasındaki farklar ne olmuştu gibi soruların cevabını görüntüleyebilmek için kullanılır.</p>
      <p>önünde — işarerti olanalar çıkanları + olanlar ise eklenenleri temsil ediyor.<br>
      git diff 1.hash 2. hash …. komutunu çalıştırarak commitler arasındaki farkı da görebiliriz.</p>
      <p>git diff Head ile son commite göre neleri değiştirdik onu görebiliriz.</p>
      <h4>git rebase</h4>
      <p>Merge commitlerinden kurtulmak için kullanılan bir komuttur. repomuz yukarıdaki örnekteki gibi olmakta.</p>
      <p>Şimdi githuba (ya da artık hangi uygulamayı kullanacaksanız) gidip orada yeni bir repo oluşturalım.</p>
      <p>Projemize bir isim vermemiz gerekiyor ve visibility seviyesini belirlememiz gerekiyor. Burada 2 seçenek var Public ve Private. Adı üzere Public olanları tüm Internet kullanıcıları görüntüleyebilir. Private olanaları ise biz ve bizim izin verdiğimiz kişiler tarafından görüntülenebilir.</p>
      <p>Ayrıca projeyi oluştururken bizden README.md uzantılı bir dosya eklmek istediğimizi sorar, bu dosya proje hakkında açıklamaları içeren bir dosyadır.</p>
      <h4>git remote</h4>
      <p>git remote add origin &lt;remoteUrl&gt; komutunu kullanarak artık localdeki branchlerimizi ve değişikliklerimizi uzak suncudaki bir repoya ekleyebilir,oradaki değişiklikleri locale getirebiliriz.</p>
      <p>Burada origin kelimesi bir alias yani takma addır bizim url mizi temsil eder. push ve pull işlemlerinde kullanılır. Origin kelimesi yerine biz keyfi olarak farklı bir kelime de kullanabiliriz ama origin daha yaygın olduğu için onu kullanıyoruz.</p>
      <h4>git push origin &lt;branchname&gt;</h4>
      <p>Bu işlem local repodaki commitlerimizi remote repo ya transfer etmemizi sağlar.</p>
      <p>git push origin feat yaparak artık tüm değişikliklerimizi remotedaki feat branch ine aktarmış olduk.<br>
      git branch –r ile remote daki branchlerimi görebiliriz.</p>
      <h4>Pull Request</h4>
      <p>Biz geliştirici olarak kendi branch imizde değikilikeler yaptık ve bunu ürünün ana branch i ile birleştirilmesini istiyoruz. githubda Pull request ya da gitlab da merge request açarak ana brnach in adminine bir talepte bulunuyoruz.Admin isterse kodları inceleyip merge edebilir veya PR ı kapatabilir.</p>
      <p>PR ın admin tarafından onaylandığını farz edelimi.</p>
      <h4>git pull /fetch</h4>
      <p>Biz bu işlemi remote da yaptığımız için localdeki git işlemelerimiz remote dan geride kaldı. Bu durumda remote repomuz local repomuzun önüne geçmiş olacak. Bunları senkronize etmek için pull ve fetch komutlarını kullanmamız gerekiyor.</p>
      <p><strong>Fetch:</strong> değişiklikleri locale getirip bizim görüntülememizi sağlarken.</p>
      <p><strong>Pull:</strong> ise bu değişikilikleri hem locale getirir hem de merge işlemini gerçekleştirir.</p>
      <h4>git fetch</h4>
      <p>git fetch origin master dediğimde değişiklikler geliyor ama git log a baktığımızda Merge commitinin olmadığını görüyorum. Remotedaki origin master branchine Gidersem bunları görüntüleyebilirim.</p>
      <p>Öncelikle remote branchlerimizi Kontrol ediyoruz. git switch origin/master Yaptığımızda bize bunun remote bir branch olduğunu söylüyor. Şimdi checkoutun yeni kullanımını öğreniyoruz yani remote branchlere checkout ile geçmemiz lazım.</p>
      <p>git log yaparak merge commitini görüntüleyebiliriz.</p>
      <h4>git pull</h4>
      <p>git pull= git fetch + git merge yani tüm değişiklikleri tamamıyla locale getirir. Bizim fetch kullanma sebebimiz bir sıkıntı var mı diye kontrol amaçlı olan bir durumdur.</p>
      <p>Yukarıda görüldüğü gibi pull işlemi ile remote daki değişiklikler geldi ve artık gitlab ve local imz ile senkron duruma geçiş yaptı.</p>
      <h4>git pull — prune</h4>
      <p>PR işleminde merge ettiğimiz branchin bir option olarak silindiğini düşünelim.</p>
      <p>git branch –r yaptığımızda origin/feat branchi hala gözüküyor.<br>
      bunu git branch –d ile de silebiliriz. Ya da pull işlemini yaparken prune anahtar sözcüğünü kullanarak otomatik olarak fazla olan branchleri ortadan kaldırabiliriz.</p>
      <h4>git clone</h4>
      <p>github ı gezdik ve bir projeyi beğendik bunu localimize getirmek istiyoruz. Ya da ortak çalıştığımız bir repo var bu projeleri locale çekmek için kullanılır.</p>
      <p>git clone url şeklinde komutu çalıştırdık ve artık proje localimizde cd ile projenin içine geçebilir. Eğer bir iznimiz var ise bu projeye commit atabiliriz.</p>
      <h4>Fork</h4>
      <p>Projeyi beğendik. Değişiklik yapmak istiyoruz ama iznimiz yok.Yeni bir commit atmak için bu durumda projeyi fork ederek kendi repomuza kaydedebiliriz. Fork butonuna bastıktan sonar artık proje bizim repomuzda.</p>
      <p>git clone ile bunu locale getirebilir yeni commitler atabiliriz. Yeni commitleri projenin sahibine göstermek için pull/merge requestlerde bulunabiliriz. Böylelikle projede uzun yoldan katkı sağlamış oluruz.</p>
      <h4>Issues</h4>
      <p>Issues lar bulduğumuz buglar olabilir, yeni fikirler olabilir, ya da tartışmalar olabilir. Bunu yeni github veya gitlab üzerinden projenin issues bölümünden açarak başlatabiliriz.</p>
      <p>Aşağıdaki Bu yazıyı hazırlarken kullandığı kaynakçalardan daha fazla ve detaylı bilgilere ulaşabilirsiniz.</p>
      <p>Okuduğunuz için Teşekkürler.</p>
      <div class="blog-sources">
        <h4>Kaynakça</h4>
        <ul>
          <li><a href="https://www.btkakademi.gov.tr" target="_blank">BTK Akademi - Versiyon Kontrolleri: Git ve GitHub</a></li>
          <li><a href="https://git-scm.com/book/en/v2" target="_blank">Pro Git Book (git-scm.com)</a></li>
        </ul>
      </div>
      <div class="blog-tags">
        <span class="blog-tag">Git</span>
        <span class="blog-tag">GitHub</span>
        <span class="blog-tag">GitLab</span>
        <span class="blog-tag">Version Control</span>
      </div>
    `
  },
  {
    id: 3,
    title: "TMDB API'sini kullanmak",
    excerpt: "TMDB API ile popüler filmleri listeleyen bir web sayfası oluşturma rehberi.",
    date: "2022-04-05",
    readTime: "4 dk",
    mediumUrl: "",
    content: `
      <h2>Tmdb API sini kullanmak</h2>
      <p><strong>Yusuf Yılmaz</strong></p>
      <p>4 min read · Apr 5, 2022</p>
      <p>Merhaba, bu yazıda sizlere birlikte api kullanarak popüler filmleri listeleyen bir web sayfası tasarlayacağız.<br>
      Öncelikle kısaca API nedir ona bakalım.</p>
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
      <pre><code>//maniupule edeceğimiz html elementleri
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
      <p>İşte sitemizin son hali</p>
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
    `
  },
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
