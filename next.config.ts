/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ This ignores TypeScript errors
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'img.clerk.com' }]
  }
};

module.exports = nextConfig;