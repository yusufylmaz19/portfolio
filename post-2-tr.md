## Git

**Yusuf Yılmaz**

9 min read · Jul 25, 2022

![Git](images/blog/2/1.png)

### Git Nedir?

Git, Linus Torvalds tarafından Linux un çekirdeğini geliştirmek üzere tasarlanıp kullanılan bir versiyon kontrol sistemidir. bi dk o da ne demek?

Versiyon kontrol sistemleri, yazılım ekiplerinin zaman içinde yaptıkları değişikleri yönetmesine yarayan yazılım aracıdır. Yani projede yaptığınız değişikleri versiyonlama, Bu versiyonlar arasında dolaşmak için kullanılan bir yapıdır.

**Git i bu kadar popüler yapan şey ne peki?**

- Hızlı olması
- Yüzlerce farklı branchde geliştirme ortamı sağlaması
- Büyük çaplı projelerde rahatlıkla çalışması
- Github gibi çok popüler bir yazılım mecrası tarafından kullanılması

Git'i popüler yapan şeyler bunlar. Sende git kullanmayı öğrenmek istiyorsan hadi başlayalım.

![Video](images/blog/2/2.mp4)

*wait wait wait*

Başlamadan önce şu yapıyı öğrenirsek çok fazla işimize yarayacağına inanıyorum.

![Git Yapısı](images/blog/2/3.png)

**working directory** e projemizin içinde olduğu klasör ortamı diyebiliriz.

**staging area** ya ise .git directory sine atmadan önce değişikliklerimizi beklettiğimiz alan olarak düşünebiliriz.

**.git directory** ise emin olduğumuz değişiklikleri içine atadığımız(commit) klasör diyebiliriz. daha sonra buradaki dosyalarımızı remote repolara atacağız tabi her şey burada bitmedi.

Dediğimiz gibi git bir versiyon kontrol sistemi, hangi değişikliği kim yaptı bunu takip etmek için git in config ayarlarını yapmamız gerekiyor.

![Video](images/blog/2/4.mp4)

*command line ımızı açıyoruz.*

Öncelikle git bilgisayarlarınızda yüklü değilse bu linkten download edip kurmanız gerekiyor.

#### git config

![Git](images/blog/2/5.png)

Yukarıda görüldüğü gibi git config ile email adresimizi git e söylemiş olduk.
Aynı şeyi name değişkeni içinde yapmamız lazım.

```
git config — global user.name 'yourname'
```

#### git init

Bu komut artık çalıştığımız klasörün bir git tarafından takip edilebileceğini ifade eder. Bulunduğumuz klasör içine .git uzantılı gizli boş bir klasör açar(.git directory).

![Git](images/blog/2/6.png)

*ls –a ile dizindeki tüm gizli ve açık içerikleri görmek istedik .git/ klasörü de karşımıza çıktı.*

#### git add \<filename\>

Bu komut ile WD de yapmış olduğumuz değişikleri SA ya (index) kaydederiz.

![Git](images/blog/2/7.png)

touch komutu ile 3 adet .txt uzantılı dosya oluşturduk.Bunları index'e kaydetmek için tek tek de ekleyebilirdik ya da son satırda olduğu gibi ' git add .' ile hepsini birden ekledik. Burada dikkat etmemiz gereken git in case sensitive olmasıdır.

#### .gitignore

Bu dosya hayati öneme sahip bir işlevsellik sağlıyor.bu dosya uzaktaki sunuculara yüklemek istemediğimiz dosyaların ve bilgileri mesela api keyimiz veya node modülelleri gibi dosyaların uzak sunuculara yüklenmesinin önüne geçmek için kullanılır.projemiz içinde .gitignore isimle bir file oluşturmamız, yüklenmesini istemediğimiz dosyların adını bu file içine yazmamız gerekmektedir.

![Git](images/blog/2/8.png)

*git in artık bu dosyalar ile bir ilişkisi yok*

#### git status

Bu komut ile yaptığımız değişiklerin staging area daki durumu hakkında bilgi ediniriz.

![Git](images/blog/2/9.png)

Görüldüğü gibi 3 yeni dosyayı index e eklemişim. birini silmiş diğer birini modifiye etmişim. Yukarıdaki açıklamalarda karşımıza iki öneri çıkıyor.

1. git rm — -cached \<file\>
   Komutunu kullanarak takip etmek istemediğimiz dosyayı unstage hale getirebiliriz. Eğer istersek tekrar git add komutunu kullanırız.
2. git restore \<file\>
   Komutunu kullanarak staged durumundaki dosyamızda yapmış olduğumuz değişikliği son committeki haline geri alabiliriz.

#### git commit

git add ile WD den index e eklemiştik dosyalarımız. şimdi bu dosyaları git commit kullanarak local repoya(.git directory e) aktaracağız. Bu işleme commit etme işlemi denir.

![Git](images/blog/2/10.png)

-m ile commitimize mesaj özelliği ekleriz.

#### git log

Bu komut ile commit geçmişimize ulaşabiliriz.

![Git](images/blog/2/11.png)

*commit işleminde yazdığımız mesaj burada gözüküyor.*

Görüldüğü gibi commit mesajı ile birlikte commit tarihi ve commiti atan kişi hakkında bilgileri ediniyoruz. Yukarıda 3 farklı kavram ile karşılaşıyoruz.

- **Hashcode:** Her commitin uniqe bir hash değeri var ve biz bu hash değerleri ileride bahsedeceğim git'in diff, checkout, revert, reset vb. komutlarında kullanıyor olacağız.
- **Head:** Nerede olduğumuzu gösterir.Bu bize genel olarak son commiti point eder. Yani son yaptığımız değişiklik Head lable'ı ile vurgulanır.
- **Branch:** bu branchleri farklı bir çalışma klasörü olarak düşünebiliriz. Her projede birden fazla branch oluşturabilir bu branchlerde farklı yapılar geliştirebilir ve bu branchleri uygun anda (conflict olmadan) birleştirebiliriz(merge).

#### git branch

Komutu ile var olan branchleri görüntüleyebiliriz.

```
git branch <branchname>
```

Komutu ile yeni bir branch oluşturabilriz.

![Git](images/blog/2/12.png)

#### git switch \<branchname\>

Komutu ile branchler arsında geçiş yapabiliriz.

![Git](images/blog/2/13.png)

#### git branch -d \<branchname\>

Komutu ile açtığımız branchi delete edebiliriz

![Git](images/blog/2/14.png)

Çoğu zaman birden fazla ekip üyesi ile çalıştığımız için farklı branchte çalışırız ve bu branchleri projenin ana branchi ile birleştirmek istediğimiz zaman git merge özelliğini kullanmamız gerekir.Bu noktada çok dikkatli davranmamız gerekir. Çünkü oluşacak conflictler projemizi çöp edebilir.

**Bu conflictler neler olabilir.?**
Örnek olarak; master branchte açtığımız bir dosyayı feat branch inde değiştiririz ama bu dosyayı master içinde delete edersek bu bize bir conflict oluşturur. Git burada otomatik merge etme işlemini gerçekleştiremez. Bu conflicti yeni bir commit atarak düzeltebiliriz.

![Git](images/blog/2/15.png)

#### git merge

İki branchi biriyle birleştirmek için kullanılır.Eğer bir conflict yoksa merge işlemi başarılı olur.

![Git](images/blog/2/16.png)

*her harfi bir commit i her satırı bir branch i temsil eder.*

Burada master branch de iken 'git merge feat' komutunu çalıştırısak feat branchimiz master ile birleşmiş olur ve aşağıdaki duruma gelir.

![Git](images/blog/2/17.png)

*h adında bir merge commit oluştu*

#### Fast Forwad

Yeni bir branch açıp orada commit atmaya devam edersek ve master branchinde hiçbir değişiklik yapmazsak ve eğer biz bu branchleri merge etmek istersek hiç conflict olmadan birleşecekleri için fast forwarding yapmış oluruz.

![Git](images/blog/2/18.png)

#### git stash

Commit etmeye hazır olmadığımız durumlarda,
Branch değiştirmek zorunda olduğumuz durumlarda ve
Yaptığımız değişikleri kaydetmek istemediğimiz durumlarda
Değişiklik yaptığımız bilginin kaybolmaması için bu komut kullanılır.Yapılan değişikleri stash adını verdiğimiz bir hafıza bölgesinde saklanır.

![Git](images/blog/2/19.png)

#### git stash pop

Stash a eklediğimiz değişikliği geri getirmek için kullanılır.

#### git stash list

Bu komut ile stash deki tüm kayıtlarımıza erişebiliriz.

![Git](images/blog/2/20.png)

#### git stash apply

Bu komut ile stash deki tüm kayıtlarımızı ekleyebiliriz. yada komutun sonuna stash id sini ekleyerek tek tek ekleyebiliriz.

#### git stash clear

Bu komut ile stash deki tüm kayıtlarımızı temizleyebiliriz.

#### git checkout \<hashcode\>

Daha önce git add ile yaptığımız işlemlere geri dönmeyi öğrendik. Bu kez commitlere geri dönmeyi göreceğiz.Bu komut attığımız commitlere geri dönmemizi sağlar.

![Git](images/blog/2/21.png)

Checkoutun yanına dönmek istediğimiz commitin hashini yazdık ve head durumu değişti. Git burada bize detached Head durum olduğunu söylüyor ve bunu düzeltmemizi istiyor.

#### Detached Head

![Git](images/blog/2/22.png)

Yukarıdaki şekilde görüldüğü gibi eğer biz C comitene dönersek Headimiz C yi point edecek ama D commiti bizim hala son commitimiz.

Bu durumda DH den kurtulmak için yapabileceğimiz 2 şey var.

1. master a geri dönerek bu durumu düzeltebiliriz. (git switch master)
2. yeni bir branch açıp yolumuza oradan devam edebiliriz.

![Git](images/blog/2/23.png)

*branch feat > git switch feat > git add . > git commit*

![Git](images/blog/2/24.png)

*commit işlemlerinde geriye gitmek için bu log kayıtı takip edilmeli*

#### git reset \<hashcode\>

Şuan 3. committeyim ve ben 2. ye dönmek istiyorum. Bu durumda=> git reset geriye dönmek istediğim noktayı(yani 2.commit hasini) yazarak ikiden onceki commitleri logdan silmiş oluyorum.

Ama yaptığım değişikler hala dosyamın içinde kayıtlı halde duracak.Eğer her iki durumuda silmek istersem=> git reset –-hard \<hashcode\> şeklinde kodumu çalıştırmam gerekir.

![Git](images/blog/2/25.png)

*B commitine döndüm*

#### git revert \<hashcode\>

3 commiti geri almak istiyorum ama commit loguna karışmak istemiyorum ve üstelik aynı branchdan de devam etmek istiyorum . Bu durumda=> git revert 'geri almak istediğimiz commitin hasini (yani 3. commit hashi) ni yazarak geriye dönüp bunu yeni bir commit ile tamamlıyoruz.

![Git](images/blog/2/26.png)

*c commitini geri aldım ama c commit kaydı silinmedi ve revert yaptığıma dair yeni bir commit oluştu.*

#### git diff

Hangi commitler arasında neleri değiştirdik,
Hangi commitler arasında ne olmuştu
Hangi branchler arasında ne olmuştu,
Working directory ve Staging area arasındaki farklar ne olmuştu gibi soruların cevabını görüntüleyebilmek için kullanılır.

![Git](images/blog/2/27.png)

*önünde — işarerti olanalar çıkanları + olanlar ise eklenenleri temsil ediyor.*

git diff 1.hash 2. hash …. komutunu çalıştırarak commitler arasındaki farkı da görebiliriz.

git diff Head ile son commite göre neleri değiştirdik onu görebiliriz.

#### git rebase

![Git](images/blog/2/28.png)

Merge commitlerinden kurtulmak için kullanılan bir komuttur. repomuz yukarıdaki örnekteki gibi olmakta.

Şimdi githuba (ya da artık hangi uygulamayı kullanacaksanız) gidip orada yeni bir repo oluşturalım.

Projemize bir isim vermemiz gerekiyor ve visibility seviyesini belirlememiz gerekiyor. Burada 2 seçenek var Public ve Private. Adı üzere Public olanları tüm Internet kullanıcıları görüntüleyebilir. Private olanaları ise biz ve bizim izin verdiğimiz kişiler tarafından görüntülenebilir.

Ayrıca projeyi oluştururken bizden README.md uzantılı bir dosya eklmek istediğimizi sorar, bu dosya proje hakkında açıklamaları içeren bir dosyadır.

#### git remote

![Git](images/blog/2/29.png)

git remote add origin \<remoteUrl\> komutunu kullanarak artık localdeki branchlerimizi ve değişikliklerimizi uzak suncudaki bir repoya ekleyebilir,oradaki değişiklikleri locale getirebiliriz.

Burada origin kelimesi bir alias yani takma addır bizim url mizi temsil eder. push ve pull işlemlerinde kullanılır. Origin kelimesi yerine biz keyfi olarak farklı bir kelime de kullanabiliriz ama origin daha yaygın olduğu için onu kullanıyoruz.

#### git push origin \<branchname\>

Bu işlem local repodaki commitlerimizi remote repo ya transfer etmemizi sağlar.

![Git](images/blog/2/30.png)

*git push origin feat yaparak artık tüm değişikliklerimizi remotedaki feat branch ine aktarmış olduk.*

git branch –r ile remote daki branchlerimi görebiliriz.

#### Pull Request

Biz geliştirici olarak kendi branch imizde değikilikeler yaptık ve bunu ürünün ana branch i ile birleştirilmesini istiyoruz. githubda Pull request ya da gitlab da merge request açarak ana brnach in adminine bir talepte bulunuyoruz.Admin isterse kodları inceleyip merge edebilir veya PR ı kapatabilir.

PR ın admin tarafından onaylandığını farz edelimi.

#### git pull /fetch

Biz bu işlemi remote da yaptığımız için localdeki git işlemelerimiz remote dan geride kaldı. Bu durumda remote repomuz local repomuzun önüne geçmiş olacak. Bunları senkronize etmek için pull ve fetch komutlarını kullanmamız gerekiyor.

**Fetch:** değişiklikleri locale getirip bizim görüntülememizi sağlarken.

**Pull:** ise bu değişikilikleri hem locale getirir hem de merge işlemini gerçekleştirir.

#### git fetch

![Git](images/blog/2/31.png)

git fetch origin master dediğimde değişiklikler geliyor ama git log a baktığımızda Merge commitinin olmadığını görüyorum. Remotedaki origin master branchine Gidersem bunları görüntüleyebilirim.

Hadi Gidelim

![Git](images/blog/2/32.png)

Öncelikle remote branchlerimizi Kontrol ediyoruz. git switch origin/master Yaptığımızda bize bunun remote bir branch olduğunu söylüyor. Şimdi checkoutun yeni kullanımını öğreniyoruz yani remote branchlere checkout ile geçmemiz lazım.

![Git](images/blog/2/33.png)

*git log yaparak merge commitini görüntüleyebiliriz.*

#### git pull

git pull= git fetch + git merge yani tüm değişiklikleri tamamıyla locale getirir. Bizim fetch kullanma sebebimiz bir sıkıntı var mı diye kontrol amaçlı olan bir durumdur.

![Git](images/blog/2/34.png)

Yukarıda görüldüğü gibi pull işlemi ile remote daki değişiklikler geldi ve artık gitlab ve local imz ile senkron duruma geçiş yaptı.

#### git pull — prune

PR işleminde merge ettiğimiz branchin bir option olarak silindiğini düşünelim.

![Git](images/blog/2/35.png)

*git branch –r yaptığımızda origin/feat branchi hala gözüküyor.*

bunu git branch –d ile de silebiliriz. Ya da pull işlemini yaparken prune anahtar sözcüğünü kullanarak otomatik olarak fazla olan branchleri ortadan kaldırabiliriz.

#### git clone

![Git](images/blog/2/36.png)

github ı gezdik ve bir projeyi beğendik bunu localimize getirmek istiyoruz. Ya da ortak çalıştığımız bir repo var bu projeleri locale çekmek için kullanılır.

git clone url şeklinde komutu çalıştırdık ve artık proje localimizde cd ile projenin içine geçebilir. Eğer bir iznimiz var ise bu projeye commit atabiliriz.

#### Fork

Projeyi beğendik. Değişiklik yapmak istiyoruz ama iznimiz yok.Yeni bir commit atmak için bu durumda projeyi fork ederek kendi repomuza kaydedebiliriz. Fork butonuna bastıktan sonar artık proje bizim repomuzda.

git clone ile bunu locale getirebilir yeni commitler atabiliriz. Yeni commitleri projenin sahibine göstermek için pull/merge requestlerde bulunabiliriz. Böylelikle projede uzun yoldan katkı sağlamış oluruz.

#### Issues

Issues lar bulduğumuz buglar olabilir, yeni fikirler olabilir, ya da tartışmalar olabilir. Bunu yeni github veya gitlab üzerinden projenin issues bölümünden açarak başlatabiliriz.

Aşağıdaki Bu yazıyı hazırlarken kullandığı kaynakçalardan daha fazla ve detaylı bilgilere ulaşabilirsiniz.

Okuduğunuz için Teşekkürler.

#### Kaynakça

- [BTK Akademi - Versiyon Kontrolleri: Git ve GitHub](https://www.btkakademi.gov.tr)
- [Pro Git Book (git-scm.com)](https://git-scm.com/book/en/v2)

`Git` `GitHub` `GitLab` `Version Control`
