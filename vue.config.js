module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:5001',
      },
    },
    public: 'http://localhost:8080',
  },
  integrity: true,
}
