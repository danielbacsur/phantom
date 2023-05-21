/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['three', '@react-three/postprocessing'])
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM(nextConfig)
