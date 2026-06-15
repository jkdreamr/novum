/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep type-checking on; don't let stylistic lint rules fail production builds.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
