const path = require("path");
const webpack = require("webpack");
const htmlPlugin = require("html-webpack-plugin");

module.exports = {
    mode:"development",
    entry:[
        './src/main.js',
        './src/main.css',
        './src/index.html'
    ],
    output:{
        path: path.resolve(__dirname, 'src'),
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import')(),
                                require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(png|jpg|gif|jpeg)/,
                use: [{
                    loader: "url-loader",
                    options:{
                        limit: 10000,
                        name:'images/[name].[ext]',
                    }
                }],
            },
             {
                test: /\.(html)$/,
                use: {
                loader: 'html-loader',
                    options: {
                         attrs: ['img:src', 'img:data-src', 'audio:src']//html图片输出
                    }
                }
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },//ES6转ES5
        ]
    },
    plugins:[
        new htmlPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    devServer:{
        contentBase: './src',
        host: 'localhost',
        hot: true,
        inline: true,
        compress: true,//一切服务都启用 gzip 压缩
        open: true,
        port: 1212,
    },
    watchOptions: {
        ignored: /node_modules/
    }
}