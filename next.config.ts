/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ ADD THIS LINE - Ignores ESLint errors
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'img.clerk.com' }]
  }
};

module.exports = nextConfig;