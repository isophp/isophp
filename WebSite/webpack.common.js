/**
 * Created by liushuai on 2018/2/28.
 */
const path=require('path');
const webpack = require('webpack');
const config = {
    entry: {

        index: './app/index.js',
        articleList: './app/articleList.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library:"isophp",
        publicPath: '/dist/',
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
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            UIkit: 'uikit',
            UIkitIcons: 'uikit/dist/js/uikit-icons'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    target: 'web',
    externals: [],
};

module.exports=config;