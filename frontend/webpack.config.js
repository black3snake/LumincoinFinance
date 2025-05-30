const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    devtool: "inline-source-map",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // Виртуальный путь для сервера (важно для devServer!)
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9001,
        hot: true,
        historyApiFallback: true   // Перевод на главную страницу index.html
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/templates", to: "./templates" },
                // { from: "./src/static/images", to: "./images" },
                { from: "./src/fonts", to: "./fonts" },
                { from: "./.env", to: "./" },
                { from: "./node_modules/bootstrap/dist/css/bootstrap.min.css", to: "./css" },
                { from: "./node_modules/bootstrap/dist/js/bootstrap.min.js", to: "./js" },

            ],
        }),
    ],
};