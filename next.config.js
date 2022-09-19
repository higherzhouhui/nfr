/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'json.capsid.one',
      'pd1.oss-us-west-1.aliyuncs.com',
      'oss.pd-1st.com',
      'dm2zb8bwza29x.cloudfront.net',
      'ikzttp.mypinata.cloud',
      'nfr-capsid.oss-us-west-1.aliyuncs.com',
    ],
  },
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {},
        },
        {
          loader: 'svgo-loader',
          options: {},
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
