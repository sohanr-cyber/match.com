/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  i18n: {
    locales: ['en-US', 'fr', 'bn', 'nl-NL'],
    defaultLocale: 'en-US'
  },
  async rewrites () {
    return [
      {
        source: '/robots.txt',
        destination: '/api/text/robots'
      },
      {
        source: '/sitemap.xml',
        destination: '/api/text/sitemap'
      }
    ]
  }
}

module.exports = nextConfig
