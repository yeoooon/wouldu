/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/stamp",
  //       destination: "/",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
