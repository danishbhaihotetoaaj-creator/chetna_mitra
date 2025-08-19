/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  images: {
    domains: ['localhost', 'vercel.app', 'aws.amazon.com', 'storage.googleapis.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/ai/:path*',
        destination: '/api/services/ai/:path*',
      },
      {
        source: '/api/auth/:path*',
        destination: '/api/services/auth/:path*',
      },
      {
        source: '/api/documents/:path*',
        destination: '/api/services/documents/:path*',
      },
      {
        source: '/api/notifications/:path*',
        destination: '/api/services/notifications/:path*',
      },
    ];
  },
};

module.exports = nextConfig;