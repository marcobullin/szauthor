const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  modify(config, { target, dev }, webpack) {
    const appConfig = Object.assign({}, config)

    if (target === 'web') {
      appConfig.module.rules.concat([
        {
          test: /\.scss$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'resolve-url-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
      ])
    }

    return appConfig
  },
}
