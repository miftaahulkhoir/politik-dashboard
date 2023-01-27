module.exports = {
  env: {
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,
    APP_ENV: process.env.APP_ENV,
    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,
    APP_COPYRIGHT: process.env.APP_COPYRIGHT,
    APP_LINKCOPYRIGHT: process.env.APP_LINKCOPYRIGHT,
    APP_POWERED_BY: process.env.APP_POWERED_BY,
    APP_LINKPOWERED_BY: process.env.APP_LINKPOWERED_BY,
    API_SOURCE: process.env.API_SOURCE,
    APP_BASEURL_DEFAULT: process.env.APP_BASEURL_DEFAULT,
    APP_BASEURL_PATRON: process.env.APP_BASEURL_PATRON,
    WEBSOCKET_CREDENTIALS_HOST: process.env.WEBSOCKET_CREDENTIALS_HOST,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_SOURCE}:path*`,
      },
    ];
  },
};
