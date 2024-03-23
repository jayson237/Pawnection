/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/ewkdfgs/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/duyqfuucs/image/upload/**",
      },
    ],
    formats: ["image/webp"],
  },
}

export default nextConfig
