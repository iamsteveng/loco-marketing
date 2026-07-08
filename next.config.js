/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://loco.hk",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
