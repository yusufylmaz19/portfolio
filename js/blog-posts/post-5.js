export const post5 = {
  id: 5,
  title: {
    tr: "rc-magnifier: React için Açık Kaynaklı Resim Zoom Kütüphanesi",
    en: "rc-magnifier: Open Source Image Zoom Library for React"
  },
  excerpt: {
    tr: "React projelerine kolayca entegre edilebilen, 5 farklı görüntüleme modu sunan açık kaynaklı resim zoom kütüphanem rc-magnifier'ı yayınladım.",
    en: "I published rc-magnifier, my open source image zoom library for React with 5 different viewing modes that can be easily integrated into any project."
  },
  date: "2026-05-23",
  readTime: "5",
  mediumUrl: "",
  content: {
    tr: `## rc-magnifier: React için Açık Kaynaklı Resim Zoom Kütüphanesi

React projelerinde resim zoom özelliklerini kolayca entegre edebilmek için geliştirdiğim açık kaynaklı paketim **rc-magnifier** yayında!

Özellikle e-ticaret siteleri ve galeriler için tasarladığım bu kütüphane; 5 farklı görüntüleme modu, tam TypeScript desteği ve tamamen özelleştirilebilir bir yapı sunuyor. Karmaşık ayarlarla uğraşmadan tek bir bileşenle projelerinize ekleyebilirsiniz.

### Kurulum

\`\`\`bash
npm install rc-magnifier
\`\`\`

### 5 Farklı Bileşen

#### 1. Magnifier — Lens Efekti

En klasik zoom deneyimi. Fare imleci görüntünün üzerinde dolaşırken dairesel veya kare bir lens büyütülmüş alanı gösterir. Lensin konumunu \`position\` prop'u ile \`follow\`, \`left\`, \`right\`, \`top\` veya \`bottom\` olarak ayarlayabilirsiniz.

\`\`\`tsx
import { Magnifier } from 'rc-magnifier';

<Magnifier src="image.jpg" lensSize={150} position="follow" />
\`\`\`

#### 2. PiPMagnifier — Picture-in-Picture

Büyütülmüş görünümün köşede sabit bir pencerede gösterildiği mod. Kullanıcı ana görsele bakarken büyütülmüş detay ayrı bir kutucukta takip edilir.

\`\`\`tsx
import { PiPMagnifier } from 'rc-magnifier';

<PiPMagnifier src="image.jpg" pipSize={250} pipPosition="top-right" />
\`\`\`

#### 3. SplitMagnifier — Bölünmüş Görünüm

Ekranı ikiye böler; bir taraf navigasyon görseli, diğer taraf büyütülmüş detay paneli olarak çalışır. Oranı \`splitRatio\` prop'u ile kontrol edebilirsiniz.

\`\`\`tsx
import { SplitMagnifier } from 'rc-magnifier';

<SplitMagnifier src="image.jpg" splitRatio={0.4} />
\`\`\`

#### 4. GridMagnifier — Izgara Görünümü

Birden fazla zoom seviyesini aynı anda gösterir. Ürün detay sayfaları gibi farklı büyütme seviyelerinin karşılaştırılmasının faydalı olduğu durumlarda idealdir.

\`\`\`tsx
import { GridMagnifier } from 'rc-magnifier';

<GridMagnifier src="image.jpg" levels={[2, 4, 8]} position="right" />
\`\`\`

#### 5. FullscreenMagnifier — Tam Ekran

Bir buton tıklamasıyla tam ekran overlay açar; kullanıcı görseli zoom yapabilir, döndürebilir ve kaydırabilir.

\`\`\`tsx
import { FullscreenMagnifier } from 'rc-magnifier';

<FullscreenMagnifier src="image.jpg" triggerText="Görseli İncele" />
\`\`\`

### Ortak Özellikler

Tüm bileşenler aynı temel \`props\` setini paylaşır:

| Prop | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| \`src\` | **Zorunlu** | Ana görsel kaynağı |
| \`largeSrc\` | \`undefined\` | Yüksek çözünürlüklü zoom görseli |
| \`zoomFactor\` | \`2.5\` | Başlangıç zoom seviyesi |
| \`minZoom\` | \`1\` | Minimum zoom seviyesi |
| \`maxZoom\` | \`10\` | Maksimum zoom seviyesi |

### Neden Geliştirdim?

E-ticaret projelerinde ürün görsellerini büyütmek için farklı kütüphaneler denedim; ya TypeScript desteği yoktu, ya özelleştirme imkânı kısıtlıydı ya da API'ları fazla karmaşıktı. Bunun yerine tek bir pakette birden fazla görüntüleme modunu bir arada sunan, sıfırdan TypeScript ile yazılmış bir çözüm oluşturmaya karar verdim.

Kaynak koduna [GitHub üzerinden](https://github.com/yusufylmaz19/rc-magnifier) ulaşabilir, paket sayfası için [npm](https://www.npmjs.com/package/rc-magnifier)'i ziyaret edebilirsiniz.`,
    en: `## rc-magnifier: Open Source Image Zoom Library for React

I just published **rc-magnifier**, my open source npm package for adding image zoom capabilities to React projects with ease!

Designed especially for e-commerce sites and galleries, this library offers 5 different viewing modes, full TypeScript support, and a fully customizable API. You can add it to your project with a single component — no complex configuration needed.

### Installation

\`\`\`bash
npm install rc-magnifier
\`\`\`

### 5 Different Components

#### 1. Magnifier — Lens Effect

The classic zoom experience. A circular or square lens follows the cursor and shows the magnified area. You can control the position with the \`position\` prop: \`follow\`, \`left\`, \`right\`, \`top\`, or \`bottom\`.

\`\`\`tsx
import { Magnifier } from 'rc-magnifier';

<Magnifier src="image.jpg" lensSize={150} position="follow" />
\`\`\`

#### 2. PiPMagnifier — Picture-in-Picture

The magnified view is pinned to a corner of the image. Users can browse the main image while keeping an eye on the zoomed detail in a fixed window.

\`\`\`tsx
import { PiPMagnifier } from 'rc-magnifier';

<PiPMagnifier src="image.jpg" pipSize={250} pipPosition="top-right" />
\`\`\`

#### 3. SplitMagnifier — Split View

Splits the display in two: one side acts as a navigator, the other as a dedicated zoom panel. Control the ratio with the \`splitRatio\` prop.

\`\`\`tsx
import { SplitMagnifier } from 'rc-magnifier';

<SplitMagnifier src="image.jpg" splitRatio={0.4} />
\`\`\`

#### 4. GridMagnifier — Grid View

Shows multiple zoom levels at the same time in a grid layout. Ideal for product detail pages where comparing different magnification levels is useful.

\`\`\`tsx
import { GridMagnifier } from 'rc-magnifier';

<GridMagnifier src="image.jpg" levels={[2, 4, 8]} position="right" />
\`\`\`

#### 5. FullscreenMagnifier — Fullscreen

Opens a fullscreen overlay with a single button click, letting users zoom, rotate, and pan the image freely.

\`\`\`tsx
import { FullscreenMagnifier } from 'rc-magnifier';

<FullscreenMagnifier src="image.jpg" triggerText="Inspect Image" />
\`\`\`

### Shared Props

All components share the same base set of props:

| Prop | Default | Description |
| :--- | :--- | :--- |
| \`src\` | **Required** | Main image source |
| \`largeSrc\` | \`undefined\` | High-resolution zoom image |
| \`zoomFactor\` | \`2.5\` | Initial magnification level |
| \`minZoom\` | \`1\` | Minimum zoom level |
| \`maxZoom\` | \`10\` | Maximum zoom level |

### Why I Built This

While working on e-commerce projects, I tried several image zoom libraries — most lacked TypeScript support, had limited customization, or had overly complex APIs. I decided to build a solution from scratch in TypeScript that bundles multiple viewing modes into a single package.

You can find the source code on [GitHub](https://github.com/yusufylmaz19/rc-magnifier) and the package on [npm](https://www.npmjs.com/package/rc-magnifier).`
  }
};
