module.exports = {
  transpilePackages: ["react-leaflet-cluster"],
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
    APP_BASEURL_LOCAL: process.env.APP_BASEURL_LOCAL,
    WEBSOCKET_CREDENTIALS_HOST: process.env.WEBSOCKET_CREDENTIALS_HOST,
    WEBSOCKET_CREDENTIALS_HOST_TILIKAN: process.env.WEBSOCKET_CREDENTIALS_HOST_TILIKAN,
    API_BASEURL_TILIKAN_V1: process.env.API_BASEURL_TILIKAN_V1,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.API_SOURCE}/:path*`,
  //     },
  //   ];
  // },
};
