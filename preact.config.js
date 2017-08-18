module.exports = function(config) {
  config.devServer.compress = false
  config.devServer.proxy = [
    {
      path: '/**',
      target: 'http://localhost:2000'
    }
  ]
}
