module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:5001',
      },
    },
    public: 'http://localhost:8080',
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/itap/boilerexam/'
    : '/',
  integrity: true,
}
