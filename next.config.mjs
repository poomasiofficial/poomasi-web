/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  reactStrictMode: false,
  images: {
    domains: ["media.licdn.com", "avatars.githubusercontent.com"],
  },
};

export default nextConfig;
