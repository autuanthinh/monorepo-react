/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // experimental: {
  //   outputStandalone: true,
  // },

  serverRuntimeConfig: {
    // secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING',
  },
  publicRuntimeConfig: {
    API_URL:
      process.env.NODE_ENV === 'development'
        ? 'https://back-end-nest-js.herokuapp.com' // development api
        : 'https://back-end-nest-js.herokuapp.com', // production api
    INTERNAL_API_URL:
      process.env.NODE_ENV === 'development'
        ? '/api' // development api
        : '/api', // production api
    LOG_LEVEL:
      process.env.NODE_ENV === 'development'
        ? 'debug' // development api
        : 'info', // production api
  },
};

module.exports = nextConfig;
