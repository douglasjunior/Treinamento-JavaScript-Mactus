const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new UglifyJSPlugin()
    ]
})
