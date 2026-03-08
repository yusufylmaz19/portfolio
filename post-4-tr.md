## Azure Web App Deployment Rehberi: GitHub Actions ve Docker ile Otomasyon

![Azure](images/blog/4/azure.webp)

Merhaba Bugün, Next.js ile geliştirdiğimiz web uygulamalarını Dockerize ederek Azure Container Registry (ACR) üzerinde nasıl barındıracağımızı ve Azure Web App ekosisteminde nasıl yayına alacağımızı inceleyeceğiz. Üstelik tüm bu süreci GitHub Actions ile tam otomatize bir CI/CD hattına dönüştüreceğiz.

### 1. Azure App Registration (Uygulama Kaydı) Yapılandırması

GitHub Actions üzerinden Azure kaynaklarına güvenli erişim sağlamak için bir App Registration oluşturmamız gerekiyor. Bu kayıt, role bazlı kimlik doğrulama ve yetkilendirme (RBAC) süreçlerini yönetecek.

Azure portal > App Registrations > Yeni kayıt oluştur ile uygulama kaydınını oluşturabiliriz. gh-actions-logingibi bir isim verebilirsiniz. Bu kaydı ilerleyen adımlarda kullanacağız.

### 2. Azure Container Registry (ACR) Yapılandırması

Docker imajlarımızı güvenli bir şekilde depolamak için bir Azure Container Registry oluşturuyoruz. Bu ACR yi mevcut bir Resource Group altında veya yeni bir grup içinde oluşturabiliriz. ACR adı global olarak benzersiz ve tamamen küçük harflerden oluşmalıdır. (örn:myapp_container)

Bu ACR ye Github Actions üzerinden push ve güncelleme işlmlerinde kullanacağımız için oluşturuduğumuz App Registration ı container'ımıza eklememiz gerekiyor onun için de aşağıdaki adımları takip edin.

**Yetki Atama Adımları:**

- ACR menüsünden Access Control (IAM) sekmesine gidin.
- Add > Add role assignment yolunu izleyin.
- Privileged administrator roles altından şu rolleri seçin: Contributor: Kaynak yönetimi için; Contributor, İmaj yükleme yetkisi için; AcrPush'u seçin.
- Assign access to kısmında "User, group, or service principal" seçeneğini işaretleyin.
- Select members kısmında arama yaparak gh-actions-login uygulamasını seçin ve kaydedin.

### 3. Azure Web App (App Service) ve Ortam Yapılandırması

Uygulamamızı yayına alacağımız Azure Web App servisini oluştururken ölçeklenebilir ve güvenli bir yapı kuruyoruz.Benzersiz bir isim belirleyin (örn: myapp-prod). Yayınlama tipi (Publish) olarak Container, işletim sistemi olarak Linux seçilmelidir.

> Burada dikkat edilmesi gereken en kritik nokta; performans kaybını ve gecikmeleri (latency) minimize etmek adına hem ACR'yi hem de Azure Web App servisini aynı Resource Group ve aynı Region (örneğin West Europe) üzerinde yapılandırmaktır. Bu strateji, özellikle Türkiye lokasyonundan erişim sağlayan kullanıcılar için sunucu tepki sürelerini iyileştirdiği gibi, Azure servislerinin kendi aralarındaki veri trafiğini de hızlandıracaktır.

**Deployment Slots (Dağıtım Yuvaları):** Tek bir App Service içinde Test ve Staging gibi farklı ortamlar oluşturabilirsiniz. Bu sayede ana uygulamanızdan (Production) bağımsız olarak yeni özellikleri test edebilirsiniz.

> Slot özelliğini kullanabilmek için Standard veya üzeri bir App Service Plan gereklidir. Bu planınız yoksa, test için ayrı bir Web App oluşturarak ilerleyebilirsiniz.

**Gereksinim: ACR Erişim Yetkisi (AcrPull)**

Web App'in ACR üzerindeki Docker imajını çekebilmesi için Managed Identity üzerinden yetkilendirme yapılması şarttır.

**Identity Tanımlama:** Web App menüsünden Identity sekmesine gidin. System assigned durumunu "On" yaparak kaydedin.

**Rol Ataması (RBAC):** ACR kaynağınıza giderek şu yolu izleyin:

- Access Control (IAM) > Add role assignment.
- Role: AcrPull (Privileged sekmesi altında).
- Assign access to: Managed Identity.
- Select Members: Oluşturduğunuz Web App ismini aratıp seçin.

**Önemli:** Eğer slot kullanıyorsanız (Test/Staging), bu yetkilendirme işlemini her bir slot için ayrı ayrı tekrarlamanız gerektiğini unutmayın.

### 4. GitHub Secrets Yapılandırması ve Veri Toplama

![Git](images/blog/4/git.png)

Otomasyonun sorunsuz çalışması için Azure üzerindeki kimlik ve kaynak bilgilerini GitHub deponuza güvenli bir şekilde tanımlamanız gerekir. Aşağıdaki tablo, hangi bilginin nereden alınacağını ve GitHub tarafında hangi anahtarla saklanacağını özetlemektedir.

| Key                               | Description                       | Where will you get from                           |
| --------------------------------- | --------------------------------- | ------------------------------------------------- |
| `ACR_LOGIN_SERVER`                | Azure Container Registry endpoint | Contianer register > Settings > Access Key        |
| `ACR_REPO_NAME`                   | Azure Container Repo name         | Could be anything. exp:'panel'                    |
| `AZUREAPPSERVICE_CLIENT_ID`       | App Registration Client ID        | App Register > All Application > gh-actions-login |
| `AZUREAPPSERVICE_SUBSCRIPTION_ID` | Azure Subscription ID             | Web App or Container Registry                     |
| `AZUREAPPSERVICE_TENANT_ID`       | Azure Tenant ID                   | App Register > All Application > gh-actions-login |
| `WEBAPP_NAME`                     | Azure Web App name                | Web App                                           |
| `WEBAPP_RESOURCE_GROUP`           | Web App's resource group          | Web App                                           |
| `NEXT_PUBLIC_API_URL`             | API address                       | from your .env file                               |

> Değişkenleri kendi projenize göre güncelleyin. Aşağıdaki tabloda gerekli secret bilgilerini ve bunların nereden alınacağını görebilirsiniz.

**Kritik Not: Repository vs. Environment Secrets**

Eğer projenizde hem Test hem de Production için ayrı yapılar kullanıyorsanız, Secret yönetimi için şunları yapmalısıznız:

- **Repository Secrets:** ACR_LOGIN_SERVER, TENANT_ID ve SUBSCRIPTION_ID gibi tüm ortamlar için ortak olan değişkenleri bu kısma ekleyin.
- **Environment Secrets:** NEXT_PUBLIC_API_URL gibi ortama özel değişkenleri GitHub üzerindeki "Environments" (Test/Production) sekmesi altında tanımlayın. Bu sayede aynı workflow dosyasını farklı parametrelerle her iki ortam için de koşturabilirsiniz.

> GitHub deponuzda Settings > Secrets and variables > Actions yolunu izleyerek "New repository secret" butonu ile yukarıdaki verileri sisteme girin.

### 5. Güvenli Kimlik Doğrulama: Federated Credentials Yapılandırması

Şu ana kadar Azure üzerinde App Registration, ACR ve Wep App oluşturup, servisler arası yüksek performans için bölge seçimlerini tamamladık ve gerekli erişim yetkileri ile güvenli kimlik bilgilerini GitHub tarafında tanımlayarak altyapımızı yayına hazır hale getirdik.

Şimdi ise bu yapıyı daha güvenli bir boyuta taşıyarak, klasik şifre (client secret) yönetimiyle uğraşmak yerine, Azure'un modern kimlik doğrulama yöntemi olan Workload Identity Federation'ı kullanacağız. Bu yöntem sayesinde GitHub ve Azure arasında şifresiz, sertifika tabanlı ve geçici anahtarlarla çalışan tam güvenli bir bağ kurmuş oluyoruz.

Kısaca Bu adımda, GitHub Actions'ın Azure kaynaklarımıza erişirken "şifre kullanmadan" kendini kanıtlamasını sağlıyoruz.

**Yapılandırma Adımları:**

- Azure Portal > App Registrations yolunu izleyin ve ilgili kaydı seçin.
- Sol menüden Certificates & secrets > Federated credentials sekmesine gelin ve Add credential butonuna tıklayın.
- Federated credential scenario kısmından GitHub Actions deploying Azure resources seçeneğini işaretleyin.

#### A. Ortam (Environment) Bazlı Yetkilendirme

GitHub deponuzda "Test" veya "Production" gibi environment'lar kullanıyorsanız:

- Organization: GitHub kullanıcı adınız veya organizasyon isminiz.
- Repository: Projenizin adı.
- Entity type: Environment
- Environment Name: Test veya Production.
- Subject Identifier da `repo:MyOrganization/MyRepository:ref:refs/environment:Production` böyle bir path oluştuğunu göreceksiniz.

#### B. Branch Bazlı Yetkilendirme

Ana sürüm imajlarını doğrudan belirli bir daldan dağıtmak için:

- Entity Type: Branch
- Branch Name: Canlıya çıkacak ana branch isminiz (Örn: deployment).
- Subject Identifier da `repo:MyOrganization/MyRepository:ref:refs/heads/deployment` böyle bir path oluştuğunu göreceksiniz.

Son olarak

Name: production-env-auth-myapp gibi açıklayıcı bir isim verip Add butonuna tıklayın.

> A adımı bizim için yeterli olabilirdi ama biz ayrı olarak biz Production'daki Image'i github workflow üzerinden manuel Live olarak işaretleyeceğimiz için production B adımı ile branchi oluşturup onun üzerinden de bu işlemi yapacağımız

### 6. Dockerfile Yapılandırması

Next.js uygulamamızı Azure üzerinde koşturabilmek için projeyi bir imaj haline getirmemiz gerekiyor. Aşağıdaki Dockerfile, Multi-Stage Build (Çok Aşamalı İnşa) yöntemini kullanarak imaj boyutunu minimuma indirir ve güvenliği artırır.

```dockerfile
FROM node:20.17.0-alpine AS builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn install --production --ignore-scripts --prefer-offline

FROM node:20.17.0-alpine AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 8080
CMD ["yarn", "start"]
```

> Dockerfile dosyasını .env ile aynı dizinde oluşturun ve yukarıdaki içeriği ekleyin:(Değişkenleri kendi projenize göre güncelleyin)

**Neden Bu Yapıyı Kullanıyoruz?**

- **Hafifletilmiş Imaj (Alpine):** Temel imaj olarak alpine kullanarak sunucuda minimum yer kaplıyoruz.
- **Multi-Stage Build:** Derleme sırasında kullanılan gereksiz dosyaları (kaynak kodlar, geliştirme paketleri vb.) son imaja dahil etmiyoruz. Sadece .next, public ve node_modules klasörlerini alarak performansı artırıyoruz.
- **Güvenlik ve Hız:** yarn install --production komutuyla sadece çalışma anında ihtiyaç duyulan paketleri bırakıyor, böylece hem güvenlik açıklarını azaltıyor hem de uygulamanın ayağa kalkma süresini kısaltıyoruz.

**Önemli Hatırlatma:** Azure Web App varsayılan olarak 8080 portunu dinlediği için EXPOSE 8080 kullanımı ve uygulamanın bu portta çalışması uyumluluk açısından kritik önem taşır.

### 7. GitHub Actions Workflow (.yml) Yapılandırması

Tüm süreci birbirine bağlayan, .github/workflows/deploy.yml dosyamızı oluşturuyoruz. Bu workflow; kodun build edilmesinden ACR'ye pushlanmasına ve Azure üzerindeki ilgili slotlara dağıtılmasına kadar tüm aşamaları yöneten ana orkestra şefimizdir.

```yaml
name: Build & Deploy (Smart Versioning)

on:
  push:
    branches:
      - production
      - test
  workflow_dispatch: # Manuel tetikleme için

permissions:
  id-token: write
  contents: read

jobs:
  # --- 1. JOB: BUILD (Push gelince çalışır) ---
  build:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    environment: ${{ github.ref == 'refs/heads/production' && 'Production' || 'Test' }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZUREAPPSERVICE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANT_ID }}
          subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTION_ID }}

      - name: Login to Azure Container Registry
        run: az acr login --name ${{ secrets.ACR_LOGIN_SERVER }}

      - name: Create .env file
        run: |
          cat <<EOF > .env
          NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${{ secrets.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
          NEXT_PUBLIC_GOOGLE_MAP_ID=${{ secrets.NEXT_PUBLIC_GOOGLE_MAP_ID }}
          EOF

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          provenance: false
          sbom: false
          file: ./Dockerfile
          tags: ${{ secrets.ACR_LOGIN_SERVER }}/${{ secrets.ACR_REPO_NAME }}:${{ github.ref_name }}-${{ github.sha }}

      - name: Clean up old images (Keep last 3)
        run: |
          KEEP=1

          if [ "${{ github.ref_name }}" == "production" ]; then
            KEEP=3
          fi

          echo "Branch: ${{ github.ref_name }} | Keeping last $KEEP images."

          az acr repository show-manifests \
            --name ${{ secrets.ACR_LOGIN_SERVER }} \
            --repository ${{ secrets.ACR_REPO_NAME }} \
            --orderby time_desc \
            --query "[?tags[?contains(@, '${{ github.ref_name }}-')]].digest" \
            -o tsv | awk "NR>$KEEP" | xargs -I% az acr repository delete --name ${{ secrets.ACR_LOGIN_SERVER }} --image ${{ secrets.ACR_REPO_NAME }}@% --yes || true

  # --- 2. JOB: DEPLOY (Build bitince çalışır) ---
  deploy:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    needs: build
    environment: ${{ github.ref == 'refs/heads/production' && 'Production' || 'Test' }}

    steps:
      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZUREAPPSERVICE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANT_ID }}
          subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTION_ID }}

      - name: Deploy to Azure Web App (Staging/Test Slot)
        run: |
          SLOT_PARAM=""
          if [ "${{ github.ref_name }}" == "production" ]; then
            SLOT_PARAM="--slot staging"
          elif [ "${{ github.ref_name }}" == "test" ]; then
            SLOT_PARAM="--slot test"
          else
            exit 1
          fi

          DOCKER_IMAGE_TAG="${{ secrets.ACR_LOGIN_SERVER }}/${{ secrets.ACR_REPO_NAME }}:${{ github.ref_name }}-${{ github.sha }}"

          az webapp config set --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            $SLOT_PARAM \
            --generic-configurations '{"acrUseManagedIdentityCreds": true}' \
            --always-on true

          az webapp config appsettings set --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            $SLOT_PARAM \
            --settings WEBSITES_PORT=8080 DOCKER_CUSTOM_IMAGE_NAME="$DOCKER_IMAGE_TAG"

          az webapp config container set --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            $SLOT_PARAM \
            --docker-custom-image-name "$DOCKER_IMAGE_TAG" \
            --docker-registry-server-url "https://${{ secrets.ACR_LOGIN_SERVER }}"

      - name: Restart Slot
        run: |
          SLOT_PARAM=""
          if [ "${{ github.ref_name }}" == "production" ]; then
            SLOT_PARAM="--slot staging"
          elif [ "${{ github.ref_name }}" == "test" ]; then
            SLOT_PARAM="--slot test"
          fi

          az webapp restart --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            $SLOT_PARAM

  # --- 3. JOB: PROMOTE TO LIVE (Sadece Butonla Çalışır) ---
  promote-to-live:
    if: github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    steps:
      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZUREAPPSERVICE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANT_ID }}
          subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTION_ID }}

      - name: Tag and Seal Image as 'live'
        run: |
          CURRENT_IMAGE=$(az webapp config appsettings list \
            --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            --query "[?name=='DOCKER_CUSTOM_IMAGE_NAME'].value" -o tsv)

          echo "Production image being sealed: $CURRENT_IMAGE"

          az acr import \
            --name ${{ secrets.ACR_LOGIN_SERVER }} \
            --source $CURRENT_IMAGE \
            --image ${{ secrets.ACR_REPO_NAME }}:live \
            --force

          az webapp config container set \
            --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            --docker-custom-image-name "${{ secrets.ACR_LOGIN_SERVER }}/${{ secrets.ACR_REPO_NAME }}:live"

          az webapp config appsettings set --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            --settings DOCKER_CUSTOM_IMAGE_NAME="${{ secrets.ACR_LOGIN_SERVER }}/${{ secrets.ACR_REPO_NAME }}:live"
```

**Workflow'un Temel Yetenekleri:**

#### JOB: Build (İnşa ve Kayıt)

Bu aşama sadece kod push edildiğinde çalışır. Amacı, uygulamanın Docker imajını oluşturup güvenli bir şekilde ACR'ye yüklemektir.

- **Azure & ACR Login:** OIDC (Workload Identity) kullanarak şifresiz bir şekilde Azure'a bağlanır.
- **Dinamik .env Oluşturma:** GitHub Secrets içinde sakladığın API anahtarlarını (NEXT_PUBLIC_API_URL gibi) derleme aşamasında Docker imajının içine enjekte eder.
- **Docker Build & Push:** Uygulamayı paketler ve her imajı branch-commit_id (Örn: production-a1b2c3d) şeklinde etiketleyerek ACR'ye gönderir.
- **Akıllı Temizlik (Clean up):** ACR'de gereksiz maliyet oluşmaması için test branch'inde sadece son imajı, production branch'inde ise (rollback ihtimaline karşı) son 3 imajı tutar; eskileri otomatik siler.

#### 2. JOB: Deploy (Dağıtım)

İmaj başarıyla oluşturulduktan sonra devreye girer. Kodun hangi branch'ten geldiğine bakarak hedefi belirler.

- **Dinamik Slot Yönetimi:** Kod production branch'inden geliyorsa Staging slotuna, test branch'inden geliyorsa Test slotuna yönlendirilir.
- **Konteyner Yapılandırması:** Azure Web App'e "Yeni imajın adresi bu, Managed Identity kullanarak ACR'den çek" talimatını verir.
- **Port ve Ayar Güncelleme:** Uygulamanın çalışması için gerekli olan WEBSITES_PORT=8080 ayarını yapar ve yeni imajı tanımlar.
- **Slot Restart:** Ayarların aktifleşmesi ve yeni imajın hemen devreye girmesi için ilgili slotu yeniden başlatır.

#### 3. JOB: Promote to Live (Canlıya Geçiş ve Mühürleme)

Bu iş akışının en "akıllı" kısmıdır. Sadece manuel olarak (butonla) tetiklendiğinde çalışır.

- **İmajı Mühürleme (Live Tag):** O an Staging slotunda çalışan ve başarılı olduğu onaylanmış imajı bulur. Bu imajı ACR içinde :live etiketiyle yeniden işaretler (import eder).
- **Versiyon Sabitleme:** Web App'i artık bu :live etiketli imaja bakacak şekilde günceller.
- **Güvenlik:** Bu işlem sadece production branch'i üzerinden çalışacak şekilde kısıtlanmıştır; böylece test aşamasındaki bir kodun yanlışlıkla canlıya çıkma ihtimali teknik olarak engellenmiş olur.

> **Sonuç:** Bu yapı sayesinde, kodunuzu pushladığınızda önce güvenli bir "bekleme odasına" (Staging/Test) alınır, siz manuel onay verene kadar canlı ortamınız (Production) korunmuş olur.

### 8. İlk Yayına Alma (Push) ve Deployment Center Yapılandırması

Altyapı hazır olduğuna göre kodlarımızı pushlayarak süreci başlatabiliriz. Test ve Staging slotları için süreç otomatize olsa da, Production (Canlı) ortamı için ilk sefere mahsus manuel bir eşitleme yapmamız gerekmektedir. Bunun temel sebebi, güvenli bir Swap (Değiştirme) işlemi için her iki slotun da erişilebilir ve uyumlu ayarlara sahip olması zorunluluğudur.

#### A. Deployment Center Ayarları

Web uygulamanızın hangi konteyner imajını kullanacağını belirtmek için aşağıdaki adımları izleyin:

- Erişim: Azure Portal > Web App > Deployment Center.
- Kaynak (Source): Container Registry.
- Konteyner Tipi: Single Container.
- İmaj Kaynağı: Azure Container Registry (ACR).
- Abonelik & Kayıt: Kendi Azure aboneliğinizi ve oluşturduğunuz ACR adını seçin.
- İmaj & Etiket (Tag): Branch yapınıza göre test veya production etiketini seçin (Örn: production-commitsha).
- Tamamlama: "Finish" diyerek ayarları kaydedin.

#### B. Ortam Değişkenleri (Environment Variables) ve Eşitleme

Uygulamanızın sorunsuz çalışması için .env verilerinin Azure tarafında tanımlanması gerekir:

- Yapılandırma: Web App > Configuration > Application Settings sekmesine gidin.
- Kopyalama Stratejisi: Staging slotundaki başarılı ayarları Production slotuna manuel olarak kopyalayın.
- Neden Manuel? İlk Swap işleminde sistemin kararlı çalışması için iki slotun da aynı çevre değişkenlerine sahip olduğundan emin olmalıyız. Bu işlem bir kez yapıldıktan sonra, sonraki güncellemeler GitHub Actions üzerinden otomatik olarak gerçekleşecektir.

#### C. Otomatik Deployment Akışı

Yapılandırma tamamlandıktan sonra sistem şu şekilde işleyecektir:

- **Test Branch:** Bu branch'e yapılan push işlemleri doğrudan Test Slotuna deploy edilir. Ancak, sürecin sorunsuz ilerlemesi için kritik öneme sahip küçük bir detay mevcut, ona birazdan değineceğiz.
- **Production/Deployment Branch:** Bu dala yapılan push işlemleri Staging Slotuna deploy edilir. Testler başarılı olduktan sonra "Swap" butonu ile Staging'deki yeni sürümü saniyeler içinde Production'a (Canlıya) aktarabilirsiniz.

> Swap mekanizmasının sunduğu en büyük avantaj; canlı ortamda (Production) beklenmedik bir hatayla karşılaşıldığında, tek bir tıklama ile önceki sürüme anında Rollback (Geri Dönüş) yapabilme imkanı sağlamasıdır. Bu sayede, yeni güncellemeleri minimum riskle yayına alabilir ve sistem kesintilerinin önüne geçebilirsiniz.

### 9. İleri Düzey Güvenlik ve Swap (Yer Değiştirme) Yapılandırması

Sistemimizi kurduk, ancak staging ortamının dış dünyaya kapalı olması ve swap işlemlerinin hatasız gerçekleşmesi için bazı kritik "ince ayarlar" yapmamız gerekiyor.

#### A. Staging Ortamı İçin Microsoft Kimlik Doğrulama (Authentication)

Staging ortamına (myapp-staging.azurewebsites.net) sadece yetkili kişilerin erişebilmesi için Microsoft Authentication eklemek güvenlik açısından kritiktir:

- **Yapılandırma:** Web App > Authentication sekmesinden "Microsoft" sağlayıcısını (provider) ekleyin.
- **Değişkenler:** Bu işlem sonucunda MICROSOFT_PROVIDER_AUTHENTICATION_SECRET ve WEBSITE_AUTH_AAD_ALLOWED_TENANTS gibi değişkenler otomatik oluşacaktır.
- **Slot Ayarı:** Bu değişkenlerin yanındaki "Deployment slot setting" kutucuğunu mutlaka işaretleyin (true yapın). Bu sayede bu ayarlar staging slotuna "çakılı" kalır; swap işlemi yapsanız bile canlı ortama (Production) taşınmaz ve canlı sitenizde beklenmedik bir login ekranı çıkmasını engeller.

#### B. Güvenli Swap İçin Warm-up ve Durum Kodları

Staging ortamına kimlik doğrulama eklediğimizde, Azure swap işlemi sırasında siteyi kontrol ederken (warm-up) bir yönlendirme veya 401 (Unauthorized) hatasıyla karşılaşabilir. Bu durumun swap işlemini başarısız kılmaması için şu ayarı yapmalıyız:

- **Değişken:** `WEBSITE_SWAP_WARMUP_PING_STATUSES`
- **Değer:** `200,301,302,401`
- **Amaç:** Azure'un staging slotuna erişmeye çalışırken aldığı yönlendirme veya yetki kodlarını "başarılı" kabul etmesini sağlar. Bu değişken tanımlanmazsa, login ekranı nedeniyle swap işlemi hata vererek duracaktır.

#### C. Hatalı Swap İşlemlerine Karşı "Güvenlik Kilidi"

Test, Staging ve Production slotları arasında çalışırken yanlışlıkla yanlış slotu (örneğin Test slotunu) canlıya almamak için bir uyarı mekanizması ekliyoruz:

- **Test Slotu Ayarı:** Test slotunuzun konfigürasyonuna `DIKKAT_BU_TEST_SLOTU_SWAP_YAPMA` vb isminde bir değişken ekleyin ve değerini true yapın.
- **Kritik Not:** Bu değişkenin de "Deployment slot setting" seçeneğini aktif edin. Böylece swap ekranında bu uyarıyı gördüğünüzde, yanlış bir işlem yapma riskinizi minimize etmiş olursunuz.

### Sonuç: Tam Otomatize Akış

Tüm bu ayarlar tamamlandığında çalışma düzeniniz şu şekilde kusursuzlaşacaktır:

- **Test Branch:** Pushlandığında doğrudan Test Slotuna gider.
- **Production Branch:** Pushlandığında önce Staging Slotuna gider.
- **Swap:** Staging üzerinde son kontrolleri yaptıktan sonra manuel olarak Swap başlatılır ve uygulama saniyeler içinde kesintisiz olarak canlıya (Production) geçer.
- **İşaretleme:** Swap sonrası GitHub üzerinden son başarılı imajı "Live" olarak etiketleyerek sürüm takibinizi tamamlayabilirsiniz.

### Özet: Mimari Akış ve Kritik Kontrol Listesi

Next.js uygulamanızın Azure üzerindeki yaşam döngüsünü şu temel kurallar çerçevesinde yönetebilirsiniz:

- **Otomatik Dağıtım Mantığı:** production branch'ine yapılan push işlemleri doğrudan Staging Slotu'na yönlenir. test branch'ine yapılan push işlemleri ise izole bir ortam olan Test Slotu'na deploy edilir.
- **İlk Kurulum Gereksinimi:** İlk swap (yer değiştirme) işleminden önce Staging slotundaki yapılandırma ayarlarını Production slotuna manuel olarak kopyalamanız gerekir. Bu işlem bir defaya mahsustur; sonraki süreçler otomatik ilerleyecektir.
- **Hatalı İşlem Koruması:** Test slotuna `DIKKAT_BU_TEST_SLOTU_SWAP_YAPMA` değişkenini ekleyip Deployment slot setting: true olarak işaretleyin. Bu, yanlışlıkla test ortamını canlıya alma riskine karşı görsel bir güvenlik bariyeridir.
- **Slot Güvenliği (Opsiyonel):** Staging ortamına veya Test ortamına yetkisiz erişimi engellemek için Microsoft Authentication eklenmesi önerilir. Bu işlemle oluşan değişkenlerin Deployment slot setting ayarını true yaparak canlı ortamın (Production) bu kısıtlamadan etkilenmemesini sağlayın.
- **Swap (Yer Değiştirme) Çözümü:** Kimlik doğrulama aktifken swap işleminin başarısız olmaması için `WEBSITE_SWAP_WARMUP_PING_STATUSES` değişkenine `200,301,302,401` değerlerini atayın. Bu, Azure'un login ekranı yönlendirmelerini "sağlıklı" kabul etmesini sağlar.
- **Depolama ve Rollback Stratejisi:** Container Registry üzerinde gereksiz maliyet ve karmaşayı önlemek için Test imajlarını temiz tutuyor, Production için ise son 3 imajı saklıyoruz. En güncel imajı live olarak etiketleyerek, olası bir kriz anında önceki 3 sürümden birine hızlıca Rollback yapabilme imkanını garanti altına alıyoruz.

---

Bugün Next.js uygulamalarımızı Dockerize ederek Azure ve GitHub Actions ile tam otomatize bir CI/CD hattına nasıl taşıyacağımızı adım adım inceledik. Modern bulut mimarisinin sunduğu güvenli ve ölçeklenebilir bir yapıyı birlikte kurmuş olduk. Vakit ayırıp okuduğunuz için teşekkürler!
