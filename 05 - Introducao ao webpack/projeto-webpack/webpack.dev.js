const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    output: 'bundle.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 8081
    }
});