import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://programming-quotes-api.azurewebsites.net/api/quotes/:path*",
      },
    ];
  },
};

export default nextConfig;
