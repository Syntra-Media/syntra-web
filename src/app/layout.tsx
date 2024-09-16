import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import type { WithContext, WebPage } from "schema-dts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jsonLD: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Syntra Media | Web Tasarım, SEO & Dijital Pazarlama Ajansı",
  description:
  "Yüksek maliyetler olmadan, web tasarımı, SEO ve sosyal medya gibi üst düzey dijital pazarlama hizmetleri sunuyoruz. 20'den fazla memnun müşterimizle birlikte Syntra Media'da yerinizi alın!",
  url: "https://syntramedia.com",
  inLanguage: "tr-TR",
  image: "https://syntramedia.com/images/og-image.png",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://syntramedia.com'),

  title: {
    template: "%s | Syntra Media",
    default: "Syntra Media | Web Tasarım, SEO & Dijital Pazarlama Ajansı",
  },
  description: "Yüksek maliyetler olmadan, web tasarımı, SEO ve sosyal medya gibi üst düzey dijital pazarlama hizmetleri sunuyoruz. 20'den fazla memnun müşterimizle birlikte Syntra Media'da yerinizi alın!",
  keywords: "dijital pazarlama",

  alternates: {
    canonical: "./",
  },

  openGraph: {
    title: "Syntra Media | Web Tasarım, SEO & Dijital Pazarlama Ajansı",
    description:
        "Yüksek maliyetler olmadan, web tasarımı, SEO ve sosyal medya gibi üst düzey dijital pazarlama hizmetleri sunuyoruz. 20'den fazla memnun müşterimizle birlikte Syntra Media'da yerinizi alın!",
    type: "website",
    locale: "tr_TR",
    url: "https://syntramedia.com",
    images: [
      {
        url: "https://syntramedia.com/images/og-image.png",
        width: 300,
        height: 300,
        alt: "Syntra Media | Web Tasarım, SEO & Dijital Pazarlama Ajansı",
      },
    ],
  },

  twitter: {
    title: "Syntra Media | Web Design, SEO & Digital Marketing Agency",
    description:
        "Yüksek maliyetler olmadan, web tasarımı, SEO ve sosyal medya gibi üst düzey dijital pazarlama hizmetleri sunuyoruz. 20'den fazla memnun müşterimizle birlikte Syntra Media'da yerinizi alın!",
    card: "summary_large_image",
    images: [
      {
        url: "https://syntramedia.com/images/og-image.png",
        width: 300,
        height: 300,
        alt: "Syntra Media | Web Design, SEO & Dijital Pazarlama Ajansı",
      },
    ],
  },

  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} text-light bg-bg`}>
    <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLD)}}
    />
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-D7W6008VJN"></Script>
    <Script id="google-analytics" strategy="lazyOnload">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-D7W6008VJN');
      `}
    </Script>
    {children}
    </body>
    </html>
  );
}
