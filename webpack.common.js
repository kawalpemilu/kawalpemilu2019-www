const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

function staticPage(name) {
    return new HtmlWebpackPlugin({
        filename: name + '/index.html',
        template: 'src/' + name + '.hbs',
        chunks: ['main', 'static'],
    })
}

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    entry: {
        main: './src/main.js',
        tabulasi: './src/tabulasi/tabulasi.ts',
        static: './src/static.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' },
            { from: 'src/404.html', to: '404.html' },
            { from: 'src/index2.html', to: 'index2.html' },
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.hbs',
            chunks: ['main', 'tabulasi'],
        }),
        staticPage('disclaimer'),
        staticPage('kontak'),
        staticPage('faq'),
        staticPage('privasi'),
        staticPage('jenis-peran-pengunjung'),
        staticPage('tentang'),
        staticPage('visualisasi'),
    ],
    module: {
        rules: [
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: 'handlebars-loader',
                        options: {
                            helperDirs: path.join(__dirname, 'src/helpers'),
                            precompileOptions: {
                                knownHelpersOnly: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
};
