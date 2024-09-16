import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import type { WithContext, WebPage } from "schema-dts";

const inter = Inter({ subsets: ["latin"] });
const jsonLD: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Syntra Media | Web Design, SEO & Digital Marketing Agency",
    description:
        "Top-tier digital marketing services, including web design, SEO, and social media, without the high costs. Join our 20+ happy clients today, here in Syntra Media!",
    url: "https://syntramedia.com/en",
    inLanguage: "en-US",
    image: "https://syntramedia.com/images/og-image.png",
};

export const metadata: Metadata = {
    metadataBase: new URL('https://syntramedia.com/en'),

    title: {
        template: "%s | Syntra Media",
        default: "Syntra Media | Web Design, SEO & Digital Marketing Agency",
    },
    description: "Top-tier digital marketing services, including web design, SEO, and social media, without the high costs. Join our 20+ happy clients today, here in Syntra Media!",
    keywords: "digital marketing",

    alternates: {
        canonical: "./",
    },

    openGraph: {
        title: "Syntra Media | Web Design, SEO & Digital Marketing Agency",
        description: "Top-tier digital marketing services, including web design, SEO, and social media, without the high costs. Join our 20+ happy clients today, here in Syntra Media!",
        type: "website",
        locale: "en_US",
        url: "https://syntramedia.com/en",
        images: [
            {
                url: "https://syntramedia.com/images/og-image.png",
                width: 300,
                height: 300,
                alt: "Syntra Media | Web Design, SEO & Digital Marketing Agency",
            },
        ],
    },

    twitter: {
        title: "Syntra Media | Web Design, SEO & Digital Marketing Agency",
        description: "Top-tier digital marketing services, including web design, SEO, and social media, without the high costs. Join our 20+ happy clients today, here in Syntra Media!",
        card: "summary_large_image",
        images: [
            {
                url: "https://syntramedia.com/images/og-image.png",
                width: 300,
                height: 300,
                alt: "Syntra Media | Web Design, SEO & Digital Marketing Agency",
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
