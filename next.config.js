/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'build-my-site-now-890.lovable.app' },
    ],
  },
};

module.exports = nextConfig;
