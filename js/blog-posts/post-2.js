export const post2 = {
  id: 2,
  title: {
    tr: "Git",
    en: "Git"
  },
  excerpt: {
    tr: "Git versiyon kontrol sistemi hakkında detaylı bir rehber.",
    en: "A detailed guide about the Git version control system."
  },
  date: "2022-07-25",
  readTime: "9",
  mediumUrl: "",
  content: {
    tr: `## Git

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

\`\`\`
git config — global user.name 'yourname'
\`\`\`

#### git init

Bu komut artık çalıştığımız klasörün bir git tarafından takip edilebileceğini ifade eder. Bulunduğumuz klasör içine .git uzantılı gizli boş bir klasör açar(.git directory).

![Git](images/blog/2/6.png)

*ls –a ile dizindeki tüm gizli ve açık içerikleri görmek istedik .git/ klasörü de karşımıza çıktı.*

#### git add \\<filename\\>

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

1. git rm — -cached \\<file\\>
   Komutunu kullanarak takip etmek istemediğimiz dosyayı unstage hale getirebiliriz. Eğer istersek tekrar git add komutunu kullanırız.
2. git restore \\<file\\>
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

\`\`\`
git branch <branchname>
\`\`\`

Komutu ile yeni bir branch oluşturabilriz.

![Git](images/blog/2/12.png)

#### git switch \\<branchname\\>

Komutu ile branchler arsında geçiş yapabiliriz.

![Git](images/blog/2/13.png)

#### git branch -d \\<branchname\\>

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

#### git checkout \\<hashcode\\>

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

#### git reset \\<hashcode\\>

Şuan 3. committeyim ve ben 2. ye dönmek istiyorum. Bu durumda=> git reset geriye dönmek istediğim noktayı(yani 2.commit hasini) yazarak ikiden onceki commitleri logdan silmiş oluyorum.

Ama yaptığım değişikler hala dosyamın içinde kayıtlı halde duracak.Eğer her iki durumuda silmek istersem=> git reset –-hard \\<hashcode\\> şeklinde kodumu çalıştırmam gerekir.

![Git](images/blog/2/25.png)

*B commitine döndüm*

#### git revert \\<hashcode\\>

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

git remote add origin \\<remoteUrl\\> komutunu kullanarak artık localdeki branchlerimizi ve değişikliklerimizi uzak suncudaki bir repoya ekleyebilir,oradaki değişiklikleri locale getirebiliriz.

Burada origin kelimesi bir alias yani takma addır bizim url mizi temsil eder. push ve pull işlemlerinde kullanılır. Origin kelimesi yerine biz keyfi olarak farklı bir kelime de kullanabiliriz ama origin daha yaygın olduğu için onu kullanıyoruz.

#### git push origin \\<branchname\\>

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

\`Git\` \`GitHub\` \`GitLab\` \`Version Control\`
`,
    en: `## Git

**Yusuf Yılmaz**

9 min read · Jul 25, 2022

![Git](images/blog/2/1.png)

### What is Git?

Git is a version control system designed by Linus Torvalds to develop the Linux kernel. Wait a minute, what does that even mean?

Version control systems are software tools that help software teams manage changes made to code over time. In other words, it is a structure used for versioning the changes you make in a project and navigating between these versions.

**So, what makes Git so popular?**

- It is fast
- It provides a development environment across hundreds of different branches
- It handles large-scale projects with ease
- It is used by very popular software platforms like GitHub

These are the things that make Git popular. If you want to learn how to use Git too, let's get started.

![Video](images/blog/2/2.mp4)

*wait wait wait*

Before we start, I believe learning this structure will be very helpful.

![Git Structure](images/blog/2/3.png)

We can call the **working directory** the folder environment where our project is located.

We can think of the **staging area** (index) as the place where we keep our changes before moving them to the .git directory.

The **.git directory** is the folder where we move (commit) the changes we are sure of. Later, we will push these files to remote repositories, but that's not all.

As we said, Git is a version control system; to track who made which change, we need to configure Git's settings.

![Video](images/blog/2/4.mp4)

*Opening our command line.*

First of all, if Git is not installed on your computer, you need to download and install it from this link.

#### git config

![Git Config](images/blog/2/5.png)

As seen above, we told Git our email address using git config. We need to do the same for the name variable.

\`\`\`
git config — global user.name 'yourname'
\`\`\`

#### git init

This command signifies that the current folder can now be tracked by Git. It creates a hidden empty folder named .git inside the directory (.git directory).

![Git Init](images/blog/2/6.png)

*We used ls –a to see all hidden and open content in the directory; the .git/ folder appeared.*

#### git add \\<filename\\>

With this command, we save the changes we made in the Working Directory (WD) to the Staging Area (SA/index).

![Git Add](images/blog/2/7.png)

We created 3 .txt files using the touch command. To save them to the index, we could add them one by one or all at once using 'git add .' as seen in the last line. Note that Git is case-sensitive.

#### .gitignore

This file provides vital functionality. It is used to prevent files and information that we don't want to upload to remote servers—such as API keys or node_modules—from being pushed. We need to create a file named .gitignore in our project and write the names of the files we don't want to be uploaded inside it.

![Gitignore](images/blog/2/8.png)

*Git no longer has a relationship with these files.*

#### git status

With this command, we get information about the status of our changes in the staging area.

![Git Status](images/blog/2/9.png)

As seen, I added 3 new files to the index, deleted one, and modified another. Two suggestions appear in the descriptions above:

1. git rm — -cached \\<file\\>
   Using this command, we can unstage a file we no longer want to track. We can use git add again if we wish.
2. git restore \\<file\\>
   Using this command, we can revert the changes made to a staged file back to its state in the last commit.

#### git commit

We moved our files from WD to the index using git add. Now we will transfer these files to the local repo (.git directory) using git commit. This process is called committing.

![Git Commit](images/blog/2/10.png)

We add a message feature to our commit using -m.

#### git log

With this command, we can access our commit history.

![Git Log](images/blog/2/11.png)

*The message we wrote during the commit process appears here.*

As seen, we get information about the commit date and the person who made the commit along with the commit message. We encounter 3 different concepts above:

- **Hashcode:** Every commit has a unique hash value, and we use these hashes in Git commands like diff, checkout, revert, reset, etc.
- **Head:** Shows where we are. It generally points to the last commit. That is, your latest change is highlighted with the Head label.
- **Branch:** We can think of branches as different working folders. Multiple branches can be created in every project to develop different structures and merge them at the appropriate time (without conflicts).

#### git branch

You can view existing branches with this command.

\`\`\`
git branch <branchname>
\`\`\`

You can create a new branch with this command.

![Git Branch](images/blog/2/12.png)

#### git switch \\<branchname\\>

You can switch between branches with this command.

![Git Switch](images/blog/2/13.png)

#### git branch -d \\<branchname\\>

You can delete a branch you created with this command.

![Git Delete Branch](images/blog/2/14.png)

Since we often work with multiple team members, we work on different branches. When we want to merge these branches with the project's main branch, we use the git merge feature. We must act very carefully at this point because conflicts can ruin the project.

**What could these conflicts be?**
For example; if we modify a file in the 'feat' branch that was opened in the 'master' branch, but delete that same file in 'master', it creates a conflict. Git cannot perform the automatic merge here. We can fix this conflict by making a new commit.

![Git Conflict](images/blog/2/15.png)

#### git merge

Used to combine two branches. If there is no conflict, the merge process succeeds.

![Git Merge](images/blog/2/16.png)

*Each letter represents a commit and each line represents a branch.*

If we run 'git merge feat' while on the master branch, our feat branch merges with master and reaches the state below.

![Git Merge Result](images/blog/2/17.png)

*A merge commit named 'h' was created.*

#### Fast Forward

If we create a new branch and continue committing there while no changes are made to the master branch, merging these branches will result in "fast forwarding" since they can combine without any conflicts.

![Git Fast Forward](images/blog/2/18.png)

#### git stash

This command is used to prevent losing changes when:
We are not ready to commit,
We have to switch branches, or
We don't want to save the changes yet.
The changes are stored in a memory area called 'stash'.

![Git Stash](images/blog/2/19.png)

#### git stash pop

Used to bring back the changes we added to the stash.

#### git stash list

With this command, we can access all our records in the stash.

![Git Stash List](images/blog/2/20.png)

#### git stash apply

With this command, we can apply all our stash records, or we can add them one by one by adding the stash ID to the end of the command.

#### git stash clear

With this command, we can clear all our records in the stash.

#### git checkout \\<hashcode\\>

We previously learned how to go back on operations with git add. This time we will see how to go back to commits. This command allows us to return to previous commits.

![Git Checkout Hash](images/blog/2/21.png)

We wrote the hash of the commit we wanted to return to next to checkout, and the Head status changed. Git tells us this is a "detached Head" state and asks us to fix it.

#### Detached Head

![Detached Head](images/blog/2/22.png)

As seen in the figure above, if we return to commit C, our Head will point to C, but commit D is still our last commit.

In this case, there are 2 things we can do to get out of DH:

1. We can fix this by returning to master (git switch master).
2. We can open a new branch and continue from there.

![Git Switch](images/blog/2/23.png)

*branch feat > git switch feat > git add . > git commit*

![Git Log History](images/blog/2/24.png)

*This log record should be followed to go back in commit processes.*

#### git reset \\<hashcode\\>

I am currently at the 3rd commit and I want to go back to the 2nd. In this case, by writing 'git reset [2nd commit hash]', I delete the commits after the second one from the log.

But the changes I made will still remain saved in my file. If I want to delete both states, I need to run my code as: git reset –-hard \\<hashcode\\>.

![Git Reset](images/blog/2/25.png)

*Returned to commit B.*

#### git revert \\<hashcode\\>

I want to undo the 3rd commit but I don't want to interfere with the commit log and I want to continue from the same branch. In this case, by writing 'git revert [3rd commit hash]', we go back and complete this with a new commit.

![Git Revert](images/blog/2/26.png)

*I reverted commit C, but the record for commit C was not deleted, and a new commit was created stating that I performed a revert.*

#### git diff

It is used to view answers to questions such as:
What did we change between which commits?
What happened between which commits?
What happened between which branches?
What were the differences between the working directory and staging area?

![Git Diff](images/blog/2/27.png)

*Lines with — represent removals, while + represents additions.*

We can also see the difference between commits by running 'git diff 1.hash 2.hash ...'.

With 'git diff Head', we can see what we changed compared to the last commit.

#### git rebase

![Git Rebase](images/blog/2/28.png)

A command used to get rid of merge commits. Our repo looks like the example above.

Now let's go to GitHub (or whichever app you use) and create a new repo there.

We need to give our project a name and determine the visibility level. There are 2 options: Public and Private. As the name suggests, Public ones can be viewed by all Internet users. Private ones can only be viewed by us and the people we grant permission to.

Also, while creating the project, it asks if we want to add a README.md file; this file contains descriptions of the project.

#### git remote

![Git Remote](images/blog/2/29.png)

Using the 'git remote add origin \\<remoteUrl\\>' command, we can now add our local branches and changes to a repo on a remote server, or bring changes from there to local.

Here, the word 'origin' is an alias, meaning a nickname that represents our URL. It is used in push and pull operations. We could use a different word instead of 'origin', but we use it because it is more common.

#### git push origin \\<branchname\\>

This process allows us to transfer our commits in the local repo to the remote repo.

![Git Push](images/blog/2/30.png)

*By doing 'git push origin feat', we have now transferred all our changes to the feat branch on the remote.*

We can see branches on remote with 'git branch –r'.

#### Pull Request

As a developer, we made changes in our own branch and we want it to be merged with the main branch of the product. We make a request to the admin of the main branch by opening a Pull Request on GitHub or a Merge Request on GitLab. If the admin wishes, they can review the code and merge it or close the PR.

Let's assume the PR is approved by the admin.

#### git pull / fetch

Since we performed this operation on remote, our local Git operations are behind the remote. In this case, our remote repo will be ahead of our local repo. We need to use pull and fetch commands to synchronize them.

**Fetch:** Brings changes to local and allows us to view them.

**Pull:** Both brings these changes to local and performs the merge process.

#### git fetch

![Git Fetch](images/blog/2/31.png)

When I say 'git fetch origin master', the changes arrive, but when I look at the git log, I see that the Merge commit is not there. If I go to the origin master branch on remote, I can view them.

Let's go.

![Git Remote Branch](images/blog/2/32.png)

First, we check our remote branches. When we do 'git switch origin/master', it tells us this is a remote branch. Now we learn the new use of checkout; we need to switch to remote branches with checkout.

![Git Log Merge](images/blog/2/33.png)

*We can view the merge commit by doing git log.*

#### git pull

git pull = git fetch + git merge, so it brings all changes completely to local. The reason we use fetch is for checking purposes to see if there is an issue.

![Git Pull](images/blog/2/34.png)

As seen above, with the pull process, changes on remote arrived and it is now synchronized with GitLab and our local.

#### git pull — prune

Let's assume the branch we merged in the PR process was deleted as an option.

![Git Prune](images/blog/2/35.png)

*When we do 'git branch –r', the origin/feat branch still appears.*

We can delete this with 'git branch –d'. Or we can automatically eliminate redundant branches by using the 'prune' keyword while performing the pull process.

#### git clone

![Git Clone](images/blog/2/36.png)

We browsed GitHub and liked a project; we want to bring it to our local. Or there is a repo we work on together; it is used to pull these projects to local.

We ran the command as 'git clone url', and now the project is in our local; we can enter the project with 'cd'. If we have permission, we can make commits to this project.

#### Fork

We liked the project. We want to make changes but we don't have permission. In this case, to make a new commit, we can fork the project and save it to our own repo. After pressing the Fork button, the project is now in our repo.

We can bring it to local with 'git clone' and make new commits. To show the new commits to the project owner, we can make pull/merge requests. In this way, we contribute to the project through a longer path.

#### Issues

Issues can be bugs we found, new ideas, or discussions. We can start this by opening it from the issues section of the project on GitHub or GitLab.

You can find more detailed information from the references used while preparing this article below.

Thanks for reading.

#### References

- [BTK Academy - Version Controls: Git and GitHub](https://www.btkakademi.gov.tr)
- [Pro Git Book (git-scm.com)](https://git-scm.com/book/en/v2)

\`Git\` \`GitHub\` \`GitLab\` \`Version Control\`
`
  }
};
