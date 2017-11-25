 const webpack = require('webpack')
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const projectDir = process.cwd();
const srcDir = resolve(projectDir, 'src');
const distDir = resolve(projectDir, 'dist');
const mainDir = resolve(srcDir, 'main');
const appJsPath = resolve(mainDir, 'index_pro.js');
const appHtmlPath = resolve(mainDir, 'index.html');

const publicPath = '/';

const generateIndex = new HtmlWebpackPlugin({
    inject: 'body',
    filename: 'index.html',
    template: appHtmlPath,
    chunks: ['app']
})

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
        warnings: false,
        drop_console: false,
        collapse_vars: true,
        reduce_vars: true
    }
});

module.exports = {
  devtool: 'cheap-source-map',

  context: srcDir,

  entry: {
    'app': [
      appJsPath
    ]
  },

  resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        actions: resolve(__dirname, 'src/actions/'),
        constants: resolve(__dirname, 'src/constants/'),
        assets: resolve(__dirname, 'src/assets/'),
        containers: resolve(__dirname, 'src/containers/'),
        main: resolve(__dirname, 'src/main/'),
        reducers: resolve(__dirname, 'src/reducers/')
      }
  },

  output: {
    publicPath,
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
    ],
  },
  plugins: [
      generateIndex,
      uglifyJs
  ],
}
