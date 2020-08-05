// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://183.252.15.157:8225/api/',
        pathRewrite: {
          '^/api': ''
        } 
      }
    },
  }
}