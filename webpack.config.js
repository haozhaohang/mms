const webpack = require('webpack')
const { resolve } = require('path')
const { appHtmlPath, loginJsPath, srcDir, appJsPath, distDir } = require('./path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const generateIndex = new HtmlWebpackPlugin({
    inject: 'body',
    filename: 'index.html',
    template: appHtmlPath,
    chunks: ['manifest', 'vendor', 'app']
})

const generateLogin = new HtmlWebpackPlugin({
    inject: 'body',
    filename: 'login.html',
    template: appHtmlPath,
    chunks: ['manifest', 'vendor', 'login']
});

const port = 9000;
const host = 'localhost';

module.exports = {
  devtool: 'cheap-source-map',

  context: srcDir,

  entry: {
    vendor: [
          'react',
          'react-dom',
          'react-redux',
          'react-router',
          'redux',
          'redux-thunk'
      ],
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      appJsPath
    ],
    login: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      loginJsPath
    ]
  },

  resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        actions: resolve(__dirname, 'src/actions/'),
        constants: resolve(__dirname, 'src/constants/'),
        components: resolve(__dirname, 'src/components/'),
        assets: resolve(__dirname, 'src/assets/'),
        containers: resolve(__dirname, 'src/containers/'),
        main: resolve(__dirname, 'src/main/'),
        reducers: resolve(__dirname, 'src/reducers/')
      }
  },

  output: {
    path: distDir,
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css/,
        loader: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
      generateIndex,
      generateLogin
  ],
  devServer: {
    port,
    host,
    proxy: {
      "/api/*": {
        "target": "http://ht.heidouzi.com",
        "changeOrigin": true,
        "pathRewrite": { "^/api" : "" },
        "headers": {
            "Host": "ht.heidouzi.com"
        }
      }
    }
  }
}
