import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable image optimization for external images to avoid Airtable URL issues
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dl.airtable.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'attachments.airtable.com',
        port: '',
        pathname: '/**',
      }
    ],
    // Disable caching for external images due to Airtable's URL refresh issue
    minimumCacheTTL: 0,
  },
};

export default nextConfig;
