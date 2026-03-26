/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',        // Important pour Docker
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'strapi',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;