module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.DISABLE_MINIMIZE) {
        webpackConfig.optimization.minimize = false
      }

      webpackConfig.module.rules.push({
        test: /\.kml$/,
        type: 'asset/source',
      })

      return webpackConfig
    },
  },
}
