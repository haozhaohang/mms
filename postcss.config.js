module.exports = {
    parser: false,
    plugins: [
        require('precss'),
        require('autoprefixer'),
        require('postcss-assets')
    ]
}