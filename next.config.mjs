/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp']
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
}

export default nextConfig
