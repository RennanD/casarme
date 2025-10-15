/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['sharp'],
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
}

export default nextConfig
