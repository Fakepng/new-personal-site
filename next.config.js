/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["th", "en"],
    defaultLocale: "th",
    localeDetection: false,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
