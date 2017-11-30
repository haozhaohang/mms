const webpack = require('webpack')
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const { appHtmlPath, loginJsPath, srcDir, appJsPath, distDir, faviconPath } = require('./path')

const publicPath = '/';

const NODE_ENV = process.env.NODE_ENV;

const extractCSS = new ExtractTextPlugin('css/[name].[contenthash:20].css');

const generateIndex = new HtmlWebpackPlugin({
    inject: 'body',
    filename: 'index.html',
    favicon: faviconPath,
    template: appHtmlPath,
    chunks: ['manifest', 'vendor', 'app']
})

const generateLogin = new HtmlWebpackPlugin({
    inject: 'body',
    filename: 'login.html',
    favicon: faviconPath,
    template: appHtmlPath,
    chunks: ['manifest', 'vendor', 'login']
});

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
    devtool: 'source-map',

    context: srcDir,

    entry: {
        vendor: [
            'moment',
            'react',
            'react-dom',
            'classnames',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-thunk',
            'urijs'
        ],
        app: appJsPath,
        login: loginJsPath
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
        publicPath,
        path: distDir,
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s?css/,
                use: extractCSS.extract(['css-loader?importLoaders=1&minimize', 'postcss-loader'])
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
        generateLogin,
        uglifyJs,
        extractCSS,
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ],
}
