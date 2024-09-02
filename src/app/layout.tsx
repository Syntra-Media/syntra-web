import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import type { WithContext, WebPage } from "schema-dts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jsonLD: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Syntra Media | Web Design, SEO & Social Media Agency",
  description:
    "Top-tier digital marketing services, including web design, SEO, and social media, without the high costs. Join our 50+ happy clients today and feel the change!",
  url: "https://syntramedia.com",
  inLanguage: "en-US",
  image: "https://syntramedia.com/images/og-image.png",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://syntramedia.com'),

  title: {
    template: "%s | Syntra Media",
    default: "Syntra Media | Web Design, SEO & Social Media Agency",
  },
  description: "Top-tier digital marketing services, including web design, SEO, and social media, without the high costs. Join our 50+ happy clients today and feel the change!",
  keywords: "digital marketing",

  alternates: {
    canonical: "./",
  },

  openGraph: {
    title: "Syntra Media | Web Design, SEO & Social Media Agency",
    description: "Top-tier digital marketing services, including web design, SEO, and social media, without the high costs. Join our 50+ happy clients today and feel the change!",
    type: "website",
    locale: "en_US",
    url: "https://syntramedia.com",
    images: [
      {
        url: "https://syntramedia.com/images/og-image.png",
        width: 300,
        height: 300,
        alt: "Syntra Media | Web Design, SEO & Social Media Agency",
      },
    ],
  },

  twitter: {
    title: "Syntra Media | Web Design, SEO & Social Media Agency",
    description: "Top-tier digital marketing services, including web design, SEO, and social media, without the high costs. Join our 50+ happy clients today and feel the change!",
    card: "summary_large_image",
    images: [
      {
        url: "https://syntramedia.com/images/og-image.png",
        width: 300,
        height: 300,
        alt: "Syntra Media | Web Design, SEO & Social Media Agency",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />
        {children}
      </body>
    </html>
  );
}
