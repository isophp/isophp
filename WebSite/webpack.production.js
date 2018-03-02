/**
 * Created by liushuai on 2018/2/28.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    plugins: [
        new UglifyJsPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
});