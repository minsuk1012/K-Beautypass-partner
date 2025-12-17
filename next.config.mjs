/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure we are not doing a static export which would break dynamic routes
  output: 'standalone', 
};

export default nextConfig;
