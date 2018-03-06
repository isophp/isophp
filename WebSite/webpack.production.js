/**
 * Created by liushuai on 2018/2/28.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionWebpackPlugin = require('compression-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
});

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        extractLess,
        new CompressionWebpackPlugin({ //gzip 压缩
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css)$'    //压缩 js 与 css
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
});