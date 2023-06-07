/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:[
      "avatars.dicebear.com",
      "res.cloudinary.com"
    ]
  }
}

module.exports = nextConfig
