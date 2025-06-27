const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
            // {
            //   test: /\.(woff|woff2|eot|ttf|otf)$/,
            //   use: [
            //       {
            //           loader: 'file-loader',
            //           options: {
            //               name: '[name].[ext]',
            //               outputPath: 'fonts',
            //               publicPath: 'fonts',
            //           }
            //       }
            //   ]
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename:  'fonts/[name][ext]', // Куда будут складываться шрифты
                },
            },

            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Creates `style` nodes from JS strings
                    // "style-loader",
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
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/templates", to: "./templates" },
                { from: "./src/static/images", to: "./images" },
                // { from: "./src/fonts", to: "./fonts" },
                { from: "./.env", to: "./" },
                { from: "./node_modules/bootstrap/dist/css/bootstrap.min.css", to: "./css" },
                { from: "./node_modules/bootstrap/dist/js/bootstrap.min.js", to: "./js" },
                { from: "./node_modules/icheck-bootstrap/icheck-bootstrap.min.css", to: "./css" },
                { from: "./node_modules/jquery/dist/jquery.min.js", to: "./js" },
                { from: "./node_modules/chart.js/dist/chart.umd.js", to: "./js" },
                { from: "./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js", to: "./js" },
                { from: "./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css", to: "./css" },
                { from: "./node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min.js", to: "./js" },
                // { from: "./node_modules/datatables.net-dt/css/dataTables.dataTables.css", to: "./css" },
                { from: "./node_modules/datatables/media/js/jquery.dataTables.min.js", to: "./js" },
                // { from: "./node_modules/datatables.net-dt/js/dataTables.dataTables.js", to: "./js" },
            ],
        }),
    ],
};