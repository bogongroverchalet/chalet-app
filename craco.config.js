module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.DISABLE_MINIMIZE) {
        webpackConfig.optimization.minimize = false
      }

      webpackConfig.module.rules.push({
        test: /\.(kml|gpx)$/,
        type: 'asset/source',
      })

      webpackConfig.module.rules.push({
        test: /\.pdf$/,
        type: 'asset/inline',
      })

      const rule = webpackConfig.module.rules.find(({ oneOf }) => !!oneOf)
      rule.oneOf.unshift({
        test: /\.ya?ml$/,
        use: 'yaml-loader',
      })

      return webpackConfig
    },
  },
}
