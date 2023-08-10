/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'routine-app.link',
        port: '3001',
        pathname: '/img/**',
      },
    ],
  },
};

module.exports = nextConfig;
