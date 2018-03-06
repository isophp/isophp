/**
 * Created by liushuai on 2018/2/28.
 */
const path=require('path');
const webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
    entry: {

        index: './app/index.js',
        articleList: './app/articleList.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library:"ISOPHP",
        publicPath: '/dist/js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["syntax-dynamic-import"] // 延迟加载
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            UIkit: 'uikit',
            UIkitIcons: 'uikit/dist/js/uikit-icons'
        }),
        new BundleAnalyzerPlugin()
    ],
    target: 'web',
    externals: [],
};

module.exports=config;