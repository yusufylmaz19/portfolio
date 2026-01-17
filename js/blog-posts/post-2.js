export const post2 = {
  id: 2,
  title: {
    tr: "Git",
    en: "Git"
  },
  excerpt: {
    tr: "Git ve versiyon kontrol sistemleri hakkında detaylı, eksiksiz bir rehber.",
    en: "A detailed, comprehensive guide about Git and version control systems."
  },
  date: "2022-07-25",
  readTime: "9 dk",
  mediumUrl: "",
  content: {
    tr: `
      <h2>Git</h2>
      <p><strong>Yusuf Yılmaz</strong></p>
      <p>9 min read · Jul 25, 2022</p>
      <img src="images/blog/2/1.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
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
      <img video-src="images/blog/2/2.mp4" poster-src="images/blog/2/video-poster.png"></img>
      <small>wait wait wait</small>
      <p>Başlamadan önce şu yapıyı öğrenirsek çok fazla işimize yarayacağına inanıyorum.</p>
      <img src="images/blog/2/3.png" alt="Git Yapısı" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p><strong>working directory</strong> e projemizin içinde olduğu klasör ortamı diyebiliriz.</p>
      <p><strong>staging area</strong> ya ise .git directory sine atmadan önce değişikliklerimizi beklettiğimiz alan olarak düşünebiliriz.</p>
      <p><strong>.git directory</strong> ise emin olduğumuz değişiklikleri içine atadığımız(commit) klasör diyebiliriz. daha sonra buradaki dosyalarımızı remote repolara atacağız tabi her şey burada bitmedi.</p>
      <p>Dediğimiz gibi git bir versiyon kontrol sistemi, hangi değişikliği kim yaptı bunu takip etmek için git in config ayarlarını yapmamız gerekiyor.</p>
      <img video-src="images/blog/2/4.mp4" poster-src="images/blog/2/video-poster.png"></img>
      <small>command line ımızı açıyoruz.</small>
      Öncelikle git bilgisayarlarınızda yüklü değilse bu linkten download edip kurmanız gerekiyor.</p>
      <h4>git config</h4>
      <img src="images/blog/2/5.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Yukarıda görüldüğü gibi git config ile email adresimizi git e söylemiş olduk.<br>
      Aynı şeyi name değişkeni içinde yapmamız lazım.</p>
      <pre><code>git config — global user.name ‘yourname’</code></pre>
      <h4>git init</h4>
      <p>Bu komut artık çalıştığımız klasörün bir git tarafından takip edilebileceğini ifade eder. Bulunduğumuz klasör içine .git uzantılı gizli boş bir klasör açar(.git directory).</p>
      <img src="images/blog/2/6.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>ls –a ile dizindeki tüm gizli ve açık içerikleri görmek istedik .git/ klasörü de karşımıza çıktı.</small>
      <h4>git add &lt;filename&gt;</h4>
      <p>Bu komut ile WD de yapmış olduğumuz değişikleri SA ya (index) kaydederiz.</p>
      <img src="images/blog/2/7.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>touch komutu ile 3 adet .txt uzantılı dosya oluşturduk.Bunları index’e kaydetmek için tek tek de ekleyebilirdik ya da son satırda olduğu gibi ’ git add .’ ile hepsini birden ekledik. Burada dikkat etmemiz gereken git in case sensitive olmasıdır.</p>
      <h4>.gitignore</h4>
      <p>Bu dosya hayati öneme sahip bir işlevsellik sağlıyor.bu dosya uzaktaki sunuculara yüklemek istemediğimiz dosyaların ve bilgileri mesela api keyimiz veya node modülelleri gibi dosyaların uzak sunuculara yüklenmesinin önüne geçmek için kullanılır.projemiz içinde .gitignore isimle bir file oluşturmamız, yüklenmesini istemediğimiz dosyların adını bu file içine yazmamız gerekmektedir.</p>
      <img src="images/blog/2/8.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>git in artık bu dosyalar ile bir ilişkisi yok</small>
      <h4>git status</h4>
      <p>Bu komut ile yaptığımız değişiklerin staging area daki durumu hakkında bilgi ediniriz.</p>
      <img src="images/blog/2/9.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Görüldüğü gibi 3 yeni dosyayı index e eklemişim. birini silmiş diğer birini modifiye etmişim. Yukarıdaki açıklamalarda karşımıza iki öneri çıkıyor.</p>
      <ol>
        <li>git rm — -cached &lt;file&gt;<br>
        Komutunu kullanarak takip etmek istemediğimiz dosyayı unstage hale getirebiliriz. Eğer istersek tekrar git add komutunu kullanırız.</li>
        <li>git restore &lt;file&gt;<br>
        Komutunu kullanarak staged durumundaki dosyamızda yapmış olduğumuz değişikliği son committeki haline geri alabiliriz.</li>
      </ol>
      <h4>git commit</h4>
      <p>git add ile WD den index e eklemiştik dosyalarımız. şimdi bu dosyaları git commit kullanarak local repoya(.git directory e) aktaracağız. Bu işleme commit etme işlemi denir.</p>
      <img src="images/blog/2/10.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>-m ile commitimize mesaj özelliği ekleriz.</p>
      <h4>git log</h4>
      <p>Bu komut ile commit geçmişimize ulaşabiliriz.</p>
      <img src="images/blog/2/11.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>commit işleminde yazdığımız mesaj burada gözüküyor.</small>
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
      <img src="images/blog/2/12.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git switch &lt;branchname&gt;</h4>
      <p>Komutu ile branchler arsında geçiş yapabiliriz.</p>
      <img src="images/blog/2/13.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git branch -d &lt;branchname&gt;</h4>
      <p>Komutu ile açtığımız branchi delete edebiliriz</p>
      <img src="images/blog/2/14.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Çoğu zaman birden fazla ekip üyesi ile çalıştığımız için farklı branchte çalışırız ve bu branchleri projenin ana branchi ile birleştirmek istediğimiz zaman git merge özelliğini kullanmamız gerekir.Bu noktada çok dikkatli davranmamız gerekir. Çünkü oluşacak conflictler projemizi çöp edebilir.</p>
      <p><strong>Bu conflictler neler olabilir.?</strong><br>
      Örnek olarak; master branchte açtığımız bir dosyayı feat branch inde değiştiririz ama bu dosyayı master içinde delete edersek bu bize bir conflict oluşturur. Git burada otomatik merge etme işlemini gerçekleştiremez. Bu conflicti yeni bir commit atarak düzeltebiliriz.</p>
      <img src="images/blog/2/15.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git merge</h4>
      <p>İki branchi biriyle birleştirmek için kullanılır.Eğer bir conflict yoksa merge işlemi başarılı olur.</p>
      <img src="images/blog/2/16.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>her harfi bir commit i her satırı bir branch i temsil eder.</small>
      Burada master branch de iken ‘git merge feat’ komutunu çalıştırısak feat branchimiz master ile birleşmiş olur ve aşağıdaki duruma gelir.</p>
      <img src="images/blog/2/17.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>h adında bir merge commit oluştu</small>
      <h4>Fast Forwad</h4>
      <p>Yeni bir branch açıp orada commit atmaya devam edersek ve master branchinde hiçbir değişiklik yapmazsak ve eğer biz bu branchleri merge etmek istersek hiç conflict olmadan birleşecekleri için fast forwarding yapmış oluruz.</p>
      <img src="images/blog/2/18.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git stash</h4>
      <p>Commit etmeye hazır olmadığımız durumlarda,<br>
      Branch değiştirmek zorunda olduğumuz durumlarda ve<br>
      Yaptığımız değişikleri kaydetmek istemediğimiz durumlarda<br>
      Değişiklik yaptığımız bilginin kaybolmaması için bu komut kullanılır.Yapılan değişikleri stash adını verdiğimiz bir hafıza bölgesinde saklanır.</p>
      <img src="images/blog/2/19.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git stash pop</h4>
      <p>Stash a eklediğimiz değişikliği geri getirmek için kullanılır.</p>
      <h4>git stash list</h4>
      <p>Bu komut ile stash deki tüm kayıtlarımıza erişebiliriz.</p>
      <img src="images/blog/2/20.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git stash apply</h4>
      <p>Bu komut ile stash deki tüm kayıtlarımızı ekleyebiliriz. yada komutun sonuna stash id sini ekleyerek tek tek ekleyebiliriz.</p>
      <h4>git stash clear</h4>
      <p>Bu komut ile stash deki tüm kayıtlarımızı temizleyebiliriz.</p>
      <h4>git checkout &lt;hashcode&gt;</h4>
      <p>Daha önce git add ile yaptığımız işlemlere geri dönmeyi öğrendik. Bu kez commitlere geri dönmeyi göreceğiz.Bu komut attığımız commitlere geri dönmemizi sağlar.</p>
      <img src="images/blog/2/21.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Checkoutun yanına dönmek istediğimiz commitin hashini yazdık ve head durumu değişti. Git burada bize detached Head durum olduğunu söylüyor ve bunu düzeltmemizi istiyor.</p>
      <h4>Detached Head</h4>
      <img src="images/blog/2/22.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Yukarıdaki şekilde görüldüğü gibi eğer biz C comitene dönersek Headimiz C yi point edecek ama D commiti bizim hala son commitimiz.</p>
      <p>Bu durumda DH den kurtulmak için yapabileceğimiz 2 şey var.</p>
      <ol>
        <li>master a geri dönerek bu durumu düzeltebiliriz. (git switch master)</li>
        <li>yeni bir branch açıp yolumuza oradan devam edebiliriz.</li>
      </ol>
      <img src="images/blog/2/23.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small branch feat > git switch feat > git add . > git commit</small>
      <img src="images/blog/2/24.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>commit işlemlerinde geriye gitmek için bu log kayıtı takip edilmeli</small>
      <h4>git reset &lt;hashcode&gt;</h4>
      <p>Şuan 3. committeyim ve ben 2. ye dönmek istiyorum. Bu durumda=> git reset geriye dönmek istediğim noktayı(yani 2.commit hasini) yazarak ikiden onceki commitleri logdan silmiş oluyorum.</p>
      <p>Ama yaptığım değişikler hala dosyamın içinde kayıtlı halde duracak.Eğer her iki durumuda silmek istersem=> git reset –-hard &lt;hashcode&gt; şeklinde kodumu çalıştırmam gerekir.</p>
      <img src="images/blog/2/25.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>B commitine döndüm</small>
      <h4>git revert &lt;hashcode&gt;</h4>
      <p>3 commiti geri almak istiyorum ama commit loguna karışmak istemiyorum ve üstelik aynı branchdan de devam etmek istiyorum . Bu durumda=> git revert ‘geri almak istediğimiz commitin hasini (yani 3. commit hashi) ni yazarak geriye dönüp bunu yeni bir commit ile tamamlıyoruz.</p>
      <img src="images/blog/2/26.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>c commitini geri aldım ama c commit kaydı silinmedi ve revert yaptığıma dair yeni bir commit oluştu.</small>
      <h4>git diff</h4>
      <p>Hangi commitler arasında neleri değiştirdik,<br>
      Hangi commitler arasında ne olmuştu<br>
      Hangi branchler arasında ne olmuştu,<br>
      Working directory ve Staging area arasındaki farklar ne olmuştu gibi soruların cevabını görüntüleyebilmek için kullanılır.</p>
      <img src="images/blog/2/27.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>önünde — işarerti olanalar çıkanları + olanlar ise eklenenleri temsil ediyor.</small>
      git diff 1.hash 2. hash …. komutunu çalıştırarak commitler arasındaki farkı da görebiliriz.</p>
      <p>git diff Head ile son commite göre neleri değiştirdik onu görebiliriz.</p>
      <h4>git rebase</h4>
      <img src="images/blog/2/28.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Merge commitlerinden kurtulmak için kullanılan bir komuttur. repomuz yukarıdaki örnekteki gibi olmakta.</p>
      <p>Şimdi githuba (ya da artık hangi uygulamayı kullanacaksanız) gidip orada yeni bir repo oluşturalım.</p>
      <p>Projemize bir isim vermemiz gerekiyor ve visibility seviyesini belirlememiz gerekiyor. Burada 2 seçenek var Public ve Private. Adı üzere Public olanları tüm Internet kullanıcıları görüntüleyebilir. Private olanaları ise biz ve bizim izin verdiğimiz kişiler tarafından görüntülenebilir.</p>
      <p>Ayrıca projeyi oluştururken bizden README.md uzantılı bir dosya eklmek istediğimizi sorar, bu dosya proje hakkında açıklamaları içeren bir dosyadır.</p>
      <h4>git remote</h4>
      <img src="images/blog/2/29.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>git remote add origin &lt;remoteUrl&gt; komutunu kullanarak artık localdeki branchlerimizi ve değişikliklerimizi uzak suncudaki bir repoya ekleyebilir,oradaki değişiklikleri locale getirebiliriz.</p>
      <p>Burada origin kelimesi bir alias yani takma addır bizim url mizi temsil eder. push ve pull işlemlerinde kullanılır. Origin kelimesi yerine biz keyfi olarak farklı bir kelime de kullanabiliriz ama origin daha yaygın olduğu için onu kullanıyoruz.</p>
      <h4>git push origin &lt;branchname&gt;</h4>
      <p>Bu işlem local repodaki commitlerimizi remote repo ya transfer etmemizi sağlar.</p>
      <img src="images/blog/2/30.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>git push origin feat yaparak artık tüm değişikliklerimizi remotedaki feat branch ine aktarmış olduk.</small>
      git branch –r ile remote daki branchlerimi görebiliriz.</p>
      <h4>Pull Request</h4>
      <p>Biz geliştirici olarak kendi branch imizde değikilikeler yaptık ve bunu ürünün ana branch i ile birleştirilmesini istiyoruz. githubda Pull request ya da gitlab da merge request açarak ana brnach in adminine bir talepte bulunuyoruz.Admin isterse kodları inceleyip merge edebilir veya PR ı kapatabilir.</p>
      <p>PR ın admin tarafından onaylandığını farz edelimi.</p>
      <h4>git pull /fetch</h4>
      <p>Biz bu işlemi remote da yaptığımız için localdeki git işlemelerimiz remote dan geride kaldı. Bu durumda remote repomuz local repomuzun önüne geçmiş olacak. Bunları senkronize etmek için pull ve fetch komutlarını kullanmamız gerekiyor.</p>
      <p><strong>Fetch:</strong> değişiklikleri locale getirip bizim görüntülememizi sağlarken.</p>
      <p><strong>Pull:</strong> ise bu değişikilikleri hem locale getirir hem de merge işlemini gerçekleştirir.</p>
      <h4>git fetch</h4>
      <img src="images/blog/2/31.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>git fetch origin master dediğimde değişiklikler geliyor ama git log a baktığımızda Merge commitinin olmadığını görüyorum. Remotedaki origin master branchine Gidersem bunları görüntüleyebilirim.</p>
      <p>Hadi Gidelim</p>
      <img src="images/blog/2/32.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Öncelikle remote branchlerimizi Kontrol ediyoruz. git switch origin/master Yaptığımızda bize bunun remote bir branch olduğunu söylüyor. Şimdi checkoutun yeni kullanımını öğreniyoruz yani remote branchlere checkout ile geçmemiz lazım.</p>
      <img src="images/blog/2/33.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>git log yaparak merge commitini görüntüleyebiliriz.</small>
      <h4>git pull</h4>
      <p>git pull= git fetch + git merge yani tüm değişiklikleri tamamıyla locale getirir. Bizim fetch kullanma sebebimiz bir sıkıntı var mı diye kontrol amaçlı olan bir durumdur.</p>
      <img src="images/blog/2/34.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Yukarıda görüldüğü gibi pull işlemi ile remote daki değişiklikler geldi ve artık gitlab ve local imz ile senkron duruma geçiş yaptı.</p>
      <h4>git pull — prune</h4>
      <p>PR işleminde merge ettiğimiz branchin bir option olarak silindiğini düşünelim.</p>
      <img src="images/blog/2/35.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>git branch –r yaptığımızda origin/feat branchi hala gözüküyor.</small>
      bunu git branch –d ile de silebiliriz. Ya da pull işlemini yaparken prune anahtar sözcüğünü kullanarak otomatik olarak fazla olan branchleri ortadan kaldırabiliriz.</p>
      <h4>git clone</h4>
      <img src="images/blog/2/36.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
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
    `,
    en: `
     <h2>Git</h2>
      <p><strong>Yusuf Yılmaz</strong></p>
      <p>9 min read · Jul 25, 2022</p>
      <img src="images/blog/2/1.png" alt="Git" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h3>What is Git?</h3>
      <p>Git is a version control system designed by Linus Torvalds to develop the Linux kernel. Wait a minute, what does that even mean?</p>
      <p>Version control systems are software tools that help software teams manage changes made to code over time. In other words, it is a structure used for versioning the changes you make in a project and navigating between these versions.</p>
      <p><strong>So, what makes Git so popular?</strong></p>
      <ul>
        <li>It is fast</li>
        <li>It provides a development environment across hundreds of different branches</li>
        <li>It handles large-scale projects with ease</li>
        <li>It is used by very popular software platforms like GitHub</li>
      </ul>
      <p>These are the things that make Git popular. If you want to learn how to use Git too, let’s get started.</p>
      <img video-src="images/blog/2/2.mp4" poster-src="images/blog/2/video-poster.png"></img>
      <small>wait wait wait</small>
      <p>Before we start, I believe learning this structure will be very helpful.</p>
      
      <img src="images/blog/2/3.png" alt="Git Structure" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>We can call the <strong>working directory</strong> the folder environment where our project is located.</p>
      <p>We can think of the <strong>staging area</strong> (index) as the place where we keep our changes before moving them to the .git directory.</p>
      <p>The <strong>.git directory</strong> is the folder where we move (commit) the changes we are sure of. Later, we will push these files to remote repositories, but that’s not all.</p>
      <p>As we said, Git is a version control system; to track who made which change, we need to configure Git's settings.</p>
      <img video-src="images/blog/2/4.mp4" poster-src="images/blog/2/video-poster.png"></img>
      <small>Opening our command line.</small>
      <p>First of all, if Git is not installed on your computer, you need to download and install it from this link.</p>
      <h4>git config</h4>
      <img src="images/blog/2/5.png" alt="Git Config" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>As seen above, we told Git our email address using git config. We need to do the same for the name variable.</p>
      <pre><code>git config — global user.name ‘yourname’</code></pre>
      <h4>git init</h4>
      <p>This command signifies that the current folder can now be tracked by Git. It creates a hidden empty folder named .git inside the directory (.git directory).</p>
      <img src="images/blog/2/6.png" alt="Git Init" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>We used ls –a to see all hidden and open content in the directory; the .git/ folder appeared.</small>
      <h4>git add &lt;filename&gt;</h4>
      <p>With this command, we save the changes we made in the Working Directory (WD) to the Staging Area (SA/index).</p>
      <img src="images/blog/2/7.png" alt="Git Add" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>We created 3 .txt files using the touch command. To save them to the index, we could add them one by one or all at once using 'git add .' as seen in the last line. Note that Git is case-sensitive.</p>
      <h4>.gitignore</h4>
      <p>This file provides vital functionality. It is used to prevent files and information that we don't want to upload to remote servers—such as API keys or node_modules—from being pushed. We need to create a file named .gitignore in our project and write the names of the files we don't want to be uploaded inside it.</p>
      <img src="images/blog/2/8.png" alt="Gitignore" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>Git no longer has a relationship with these files.</small>
      <h4>git status</h4>
      <p>With this command, we get information about the status of our changes in the staging area.</p>
      <img src="images/blog/2/9.png" alt="Git Status" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>As seen, I added 3 new files to the index, deleted one, and modified another. Two suggestions appear in the descriptions above:</p>
      <ol>
        <li>git rm — -cached &lt;file&gt;<br>
        Using this command, we can unstage a file we no longer want to track. We can use git add again if we wish.</li>
        <li>git restore &lt;file&gt;<br>
        Using this command, we can revert the changes made to a staged file back to its state in the last commit.</li>
      </ol>
      <h4>git commit</h4>
      <p>We moved our files from WD to the index using git add. Now we will transfer these files to the local repo (.git directory) using git commit. This process is called committing.</p>
      <img src="images/blog/2/10.png" alt="Git Commit" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>We add a message feature to our commit using -m.</p>
      <h4>git log</h4>
      <p>With this command, we can access our commit history.</p>
      <img src="images/blog/2/11.png" alt="Git Log" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>The message we wrote during the commit process appears here.</small>
      <p>As seen, we get information about the commit date and the person who made the commit along with the commit message. We encounter 3 different concepts above:</p>
      <ul>
        <li><strong>Hashcode:</strong> Every commit has a unique hash value, and we use these hashes in Git commands like diff, checkout, revert, reset, etc.</li>
        <li><strong>Head:</strong> Shows where we are. It generally points to the last commit. That is, your latest change is highlighted with the Head label.</li>
        <li><strong>Branch:</strong> We can think of branches as different working folders. Multiple branches can be created in every project to develop different structures and merge them at the appropriate time (without conflicts).</li>
      </ul>
      <h4>git branch</h4>
      <p>You can view existing branches with this command.</p>
      <pre><code>git branch &lt;branchname&gt;</code></pre>
      <p>You can create a new branch with this command.</p>
      <img src="images/blog/2/12.png" alt="Git Branch" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git switch &lt;branchname&gt;</h4>
      <p>You can switch between branches with this command.</p>
      <img src="images/blog/2/13.png" alt="Git Switch" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git branch -d &lt;branchname&gt;</h4>
      <p>You can delete a branch you created with this command.</p>
      <img src="images/blog/2/14.png" alt="Git Delete Branch" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Since we often work with multiple team members, we work on different branches. When we want to merge these branches with the project's main branch, we use the git merge feature. We must act very carefully at this point because conflicts can ruin the project.</p>
      <p><strong>What could these conflicts be?</strong><br>
      For example; if we modify a file in the 'feat' branch that was opened in the 'master' branch, but delete that same file in 'master', it creates a conflict. Git cannot perform the automatic merge here. We can fix this conflict by making a new commit.</p>
      <img src="images/blog/2/15.png" alt="Git Conflict" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git merge</h4>
      <p>Used to combine two branches. If there is no conflict, the merge process succeeds.</p>
      
      <img src="images/blog/2/16.png" alt="Git Merge" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>Each letter represents a commit and each line represents a branch.</small>
      <p>If we run 'git merge feat' while on the master branch, our feat branch merges with master and reaches the state below.</p>
      <img src="images/blog/2/17.png" alt="Git Merge Result" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>A merge commit named 'h' was created.</small>
      <h4>Fast Forward</h4>
      <p>If we create a new branch and continue committing there while no changes are made to the master branch, merging these branches will result in "fast forwarding" since they can combine without any conflicts.</p>
      <img src="images/blog/2/18.png" alt="Git Fast Forward" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git stash</h4>
      <p>This command is used to prevent losing changes when:<br>
      We are not ready to commit,<br>
      We have to switch branches, or<br>
      We don't want to save the changes yet.<br>
      The changes are stored in a memory area called 'stash'.</p>
      <img src="images/blog/2/19.png" alt="Git Stash" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git stash pop</h4>
      <p>Used to bring back the changes we added to the stash.</p>
      <h4>git stash list</h4>
      <p>With this command, we can access all our records in the stash.</p>
      <img src="images/blog/2/20.png" alt="Git Stash List" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <h4>git stash apply</h4>
      <p>With this command, we can apply all our stash records, or we can add them one by one by adding the stash ID to the end of the command.</p>
      <h4>git stash clear</h4>
      <p>With this command, we can clear all our records in the stash.</p>
      <h4>git checkout &lt;hashcode&gt;</h4>
      <p>We previously learned how to go back on operations with git add. This time we will see how to go back to commits. This command allows us to return to previous commits.</p>
      <img src="images/blog/2/21.png" alt="Git Checkout Hash" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>We wrote the hash of the commit we wanted to return to next to checkout, and the Head status changed. Git tells us this is a "detached Head" state and asks us to fix it.</p>
      <h4>Detached Head</h4>
      [Image explaining Git detached HEAD state]
      <img src="images/blog/2/22.png" alt="Detached Head" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>As seen in the figure above, if we return to commit C, our Head will point to C, but commit D is still our last commit.</p>
      <p>In this case, there are 2 things we can do to get out of DH:</p>
      <ol>
        <li>We can fix this by returning to master (git switch master).</li>
        <li>We can open a new branch and continue from there.</li>
      </ol>
      <img src="images/blog/2/23.png" alt="Git Switch" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>branch feat > git switch feat > git add . > git commit</small>
      <img src="images/blog/2/24.png" alt="Git Log History" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>This log record should be followed to go back in commit processes.</small>
      <h4>git reset &lt;hashcode&gt;</h4>
      <p>I am currently at the 3rd commit and I want to go back to the 2nd. In this case, by writing 'git reset [2nd commit hash]', I delete the commits after the second one from the log.</p>
      <p>But the changes I made will still remain saved in my file. If I want to delete both states, I need to run my code as: git reset –-hard &lt;hashcode&gt;.</p>
      <img src="images/blog/2/25.png" alt="Git Reset" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>Returned to commit B.</small>
      <h4>git revert &lt;hashcode&gt;</h4>
      <p>I want to undo the 3rd commit but I don't want to interfere with the commit log and I want to continue from the same branch. In this case, by writing 'git revert [3rd commit hash]', we go back and complete this with a new commit.</p>
      <img src="images/blog/2/26.png" alt="Git Revert" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>I reverted commit C, but the record for commit C was not deleted, and a new commit was created stating that I performed a revert.</small>
      <h4>git diff</h4>
      <p>It is used to view answers to questions such as:<br>
      What did we change between which commits?<br>
      What happened between which commits?<br>
      What happened between which branches?<br>
      What were the differences between the working directory and staging area?</p>
      <img src="images/blog/2/27.png" alt="Git Diff" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>Lines with — represent removals, while + represents additions.</small>
      <p>We can also see the difference between commits by running 'git diff 1.hash 2.hash ...'.</p>
      <p>With 'git diff Head', we can see what we changed compared to the last commit.</p>
      <h4>git rebase</h4>
      [Image comparing Git merge vs rebase]
      <img src="images/blog/2/28.png" alt="Git Rebase" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>A command used to get rid of merge commits. Our repo looks like the example above.</p>
      <p>Now let's go to GitHub (or whichever app you use) and create a new repo there.</p>
      <p>We need to give our project a name and determine the visibility level. There are 2 options: Public and Private. As the name suggests, Public ones can be viewed by all Internet users. Private ones can only be viewed by us and the people we grant permission to.</p>
      <p>Also, while creating the project, it asks if we want to add a README.md file; this file contains descriptions of the project.</p>
      <h4>git remote</h4>
      <img src="images/blog/2/29.png" alt="Git Remote" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>Using the 'git remote add origin <remoteUrl>' command, we can now add our local branches and changes to a repo on a remote server, or bring changes from there to local.</p>
      <p>Here, the word 'origin' is an alias, meaning a nickname that represents our URL. It is used in push and pull operations. We could use a different word instead of 'origin', but we use it because it is more common.</p>
      <h4>git push origin &lt;branchname&gt;</h4>
      <p>This process allows us to transfer our commits in the local repo to the remote repo.</p>
      <img src="images/blog/2/30.png" alt="Git Push" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>By doing 'git push origin feat', we have now transferred all our changes to the feat branch on the remote.</small>
      <p>We can see branches on remote with 'git branch –r'.</p>
      <h4>Pull Request</h4>
      <p>As a developer, we made changes in our own branch and we want it to be merged with the main branch of the product. We make a request to the admin of the main branch by opening a Pull Request on GitHub or a Merge Request on GitLab. If the admin wishes, they can review the code and merge it or close the PR.</p>
      <p>Let's assume the PR is approved by the admin.</p>
      <h4>git pull / fetch</h4>
      <p>Since we performed this operation on remote, our local Git operations are behind the remote. In this case, our remote repo will be ahead of our local repo. We need to use pull and fetch commands to synchronize them.</p>
      <p><strong>Fetch:</strong> Brings changes to local and allows us to view them.</p>
      <p><strong>Pull:</strong> Both brings these changes to local and performs the merge process.</p>
      <h4>git fetch</h4>
      <img src="images/blog/2/31.png" alt="Git Fetch" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>When I say 'git fetch origin master', the changes arrive, but when I look at the git log, I see that the Merge commit is not there. If I go to the origin master branch on remote, I can view them.</p>
      <p>Let's go.</p>
      <img src="images/blog/2/32.png" alt="Git Remote Branch" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>First, we check our remote branches. When we do 'git switch origin/master', it tells us this is a remote branch. Now we learn the new use of checkout; we need to switch to remote branches with checkout.</p>
      <img src="images/blog/2/33.png" alt="Git Log Merge" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>We can view the merge commit by doing git log.</small>
      <h4>git pull</h4>
      <p>git pull = git fetch + git merge, so it brings all changes completely to local. The reason we use fetch is for checking purposes to see if there is an issue.</p>
      <img src="images/blog/2/34.png" alt="Git Pull" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>As seen above, with the pull process, changes on remote arrived and it is now synchronized with GitLab and our local.</p>
      <h4>git pull — prune</h4>
      <p>Let's assume the branch we merged in the PR process was deleted as an option.</p>
      <img src="images/blog/2/35.png" alt="Git Prune" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <small>When we do 'git branch –r', the origin/feat branch still appears.</small>
      <p>We can delete this with 'git branch –d'. Or we can automatically eliminate redundant branches by using the 'prune' keyword while performing the pull process.</p>
      <h4>git clone</h4>
      <img src="images/blog/2/36.png" alt="Git Clone" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px; background-color: #f4f4f4; padding: 10px;">
      <p>We browsed GitHub and liked a project; we want to bring it to our local. Or there is a repo we work on together; it is used to pull these projects to local.</p>
      <p>We ran the command as 'git clone url', and now the project is in our local; we can enter the project with 'cd'. If we have permission, we can make commits to this project.</p>
      <h4>Fork</h4>
      <p>We liked the project. We want to make changes but we don't have permission. In this case, to make a new commit, we can fork the project and save it to our own repo. After pressing the Fork button, the project is now in our repo.</p>
      <p>We can bring it to local with 'git clone' and make new commits. To show the new commits to the project owner, we can make pull/merge requests. In this way, we contribute to the project through a longer path.</p>
      <h4>Issues</h4>
      <p>Issues can be bugs we found, new ideas, or discussions. We can start this by opening it from the issues section of the project on GitHub or GitLab.</p>
      <p>You can find more detailed information from the references used while preparing this article below.</p>
      <p>Thanks for reading.</p>
      <div class="blog-sources">
        <h4>References</h4>
        <ul>
          <li><a href="https://www.btkakademi.gov.tr" target="_blank">BTK Academy - Version Controls: Git and GitHub</a></li>
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
  }
}
