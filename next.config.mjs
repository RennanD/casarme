/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['sharp', 'stripe'],
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
}

export default nextConfig
