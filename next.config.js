/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  basePath: '/bac-ses-revision',
  assetPrefix: '/bac-ses-revision/',
}

module.exports = nextConfig 