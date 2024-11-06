/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["tr-TR", "en-US"],
        defaultLocale: "tr-TR",
        localeDetection: false,
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
            },
        ],
    },

    output: "standalone",
};

export default nextConfig;
