module.exports = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    STORAGE_BASE_URL: process.env.STORAGE_BASE_URL,
    MAPS_API_KEY: process.env.MAPS_API_KEY,
    CIDADE_API_URL: process.env.CIDADE_API_URL,
  },
  async redirects() {
    return [
      {
        source: "/oferta/dipz/inauguracao-artur-alvim",
        destination: "/oferta/dipz/inauguracao-carrao-sul",
        permanent: false
      }
    ];
  }
};
