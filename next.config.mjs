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
  // issue https://github.com/vercel/next.js/issues/46493#issuecomment-1447650463
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"]
    return config
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // }
}

export default nextConfig
