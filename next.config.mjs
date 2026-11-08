/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'], remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  async redirects() {
    return [{ source: '/', destination: '/en', permanent: false }];
  },
};
