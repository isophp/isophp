/**
 * Created by liushuai on 2018/2/28.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    watch: true,
    devServer: {
        inline: true,
        publicPath: '/dist/'
    }
});