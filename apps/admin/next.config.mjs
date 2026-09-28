/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@eclat/ui", "@eclat/config", "@eclat/db", "@eclat/auth"],
  typescript: {
    // Surface real errors; do not ignore
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
