/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/duyqfuucs/image/upload/**",
      },
    ],
    formats: ["image/webp"],
  },
  // issue https://github.com/vercel/next.js/issues/46493#issuecomment-1447650463
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"]
    return config
  },
}

export default nextConfig
