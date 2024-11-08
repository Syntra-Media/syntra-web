/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["tr-TR", "en-US"],
        defaultLocale: "tr-TR",
        localeDetection: false,
    },

    images: {
      unoptimized: true,
      remotePatterns: [
          {
              protocol: "https",
              hostname: "utfs.io",
          },
      ],
    },
};

export default nextConfig;
