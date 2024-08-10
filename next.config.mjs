/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'api.escuelajs.co',
  //       port: '',
  //       pathname: '/api/v1/products/**',
  //     },
  //   ],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'api.escuelajs.co',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
      },
    ],
  },
};

export default nextConfig;
