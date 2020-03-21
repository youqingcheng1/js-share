const path = require("path");
const uglify = require("uglifyjs-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpakPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode:'production',
    entry:[
        './src/main.js',
        './src/main.css'
    ],
    output:{
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
            },//打包css，加后缀
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
                        limit: 10000,// 小图转成base64
                        name: 'images/[name].[hash].[ext]',
                    }
                }],
            },//打包图片
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },//ES6转ES5
            {
                test: /\.(htm|html)$/i,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-original',':src']
                    }
                }
            },//自定义打包html图片
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[hame].[contenthash].css"
        }),
        new CleanWebpakPlugin({
            root: path.join(__dirname, "../"),
            verbose: false,
            dry: false
        }),
        new uglify({
            test: /\.js(\?.*)?$/i,
            sourceMap: false,
        }),
        new htmlPlugin({
            minify:{
                minifyCSS:true,
                minifyJS:true,
                removeComments:true,
                collapseWhitespace:true
            },
            chunks:'main',
            filename:'index.html',
            template: 'src/index.html'
        }),
        new OptimizeCssAssetsPlugin()
    ]
}