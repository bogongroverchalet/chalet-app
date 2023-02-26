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

      const rule = webpackConfig.module.rules.find(({ oneOf }) => !!oneOf)
      rule.oneOf.unshift({
        test: /\.ya?ml$/,
        use: 'yaml-loader',
      })

      return webpackConfig
    },
  },
}
