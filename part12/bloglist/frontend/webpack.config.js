const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = (env, argv) => {
  const backend_url = '/api'
  // Proxies backend calls in DEV. If independent container, use (Docker) host. Otherwise use direct backend host.
  const proxy_url = process.env.PROXY_URL || 'http://localhost:3003'

  return {
    target: argv.mode === 'development' ? 'web' : 'browserslist',
    entry: ['./src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
      publicPath: '/',
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3004,
      proxy: {
        '/api': proxy_url
      },
      hot: true,
      historyApiFallback: true,
      allowedHosts: [
        'bloglist-frontend',
        'localhost',
      ],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
      new HtmlWebpackPlugin({
        title: 'Bloglist app',
        template: 'src/assets/template.html',
      })
    ]
  }
}
module.exports = config
