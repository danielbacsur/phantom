/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/postprocessing",
  "@react-three/cannon",
  "@react-three/drei",
  "@react-three/fiber",
  "@react-three/postprocessing",
]);
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
