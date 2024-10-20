/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/duyqfuucs/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        pathname: "/api/v1/image/assets/**",
      },
    ],
  },
  // issue https://github.com/vercel/next.js/issues/46493#issuecomment-1447650463
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"]
    return config
  },
}

export default nextConfig
