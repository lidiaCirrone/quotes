import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api.forismatic.com/api/1.0/:path*',
      },
    ]
  },
};

export default nextConfig;
