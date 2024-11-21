/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure static export for Spline and Three.js components
  typescript: {
    ignoreBuildErrors: true, // Optional: if you get TS errors during build
  },
}

module.exports = nextConfig