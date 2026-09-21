/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://loco.hk",
        permanent: false,
      },
      {
        source: "/student",
        destination: "/student/zh",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/student/zh", destination: "/student/zh.html" },
      { source: "/student/en", destination: "/student/en.html" },
    ];
  },
};

module.exports = nextConfig;
