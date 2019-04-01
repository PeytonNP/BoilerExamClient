module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:62810',
      },
    },
    public: 'http://localhost:8080',
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/itap/boilerexam/'
    : '/',
  integrity: true,
  parallel: false,
}
