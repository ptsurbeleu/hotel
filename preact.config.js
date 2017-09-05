module.exports = function(config) {
  config.devServer = config.devServer || {}
  config.devServer.compress = false
  config.devServer.proxy = [
    {
      path: '/**',
      target: 'http://localhost:2000'
    }
  ]
}
