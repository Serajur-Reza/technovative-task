import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       // 1. New, distinct local path source
  //       source: "/api/backend/management/v3/:path*",
  //       // 2. Destination matches your exact backend address
  //       destination: "http://localhost:11000/api/management/v3/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
