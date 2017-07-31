module.exports = function(config) {
  config.devServer.proxy = [
    {
      path: '/**',
      target: 'http://localhost:2000'
    }
  ]
}
