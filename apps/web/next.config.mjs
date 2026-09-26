/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@eclat/ui", "@eclat/config", "@eclat/db"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
