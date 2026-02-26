/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  allowedDevOrigins: [
    "*.replit.dev",
    "*.repl.co",
    "127.0.0.1",
    "localhost",
    "24238bb9-2a63-4815-b431-6a2411fd895a-00-fg1wrdnc06gi.riker.replit.dev"
  ],
}

export default nextConfig
