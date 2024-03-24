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
      {
        protocol: "https",
        hostname: "**",
      }, // emit all images hostname heheh, not recommend, but since in dev
    ],
    formats: ["image/webp"],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // }
}

export default nextConfig
