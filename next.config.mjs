/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/projects/context-companion",
        destination: "/projects/context-co",
        statusCode: 301,
      },
    ]
  },
}

export default nextConfig
