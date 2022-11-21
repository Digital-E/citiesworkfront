
module.exports = {
  swcMinify: false,
  images: {
    domains: ['cdn.sanity.io'],
  },
  compiler: {
    styledComponents: true,
  },
  // async redirects() {
  //   return [
  //     { source: "/", destination: "/fr", permanent: false },
  //   ];
  // },
}
