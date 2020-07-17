const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const TerserPlugin = require('terser-webpack-plugin');

const paletteLocalLess = fs.readFileSync(path.join(__dirname, '../theme/theme.less'), 'utf8');
const paletteLocal = lessToJs(paletteLocalLess);
const palette = Object.assign(paletteLocal);

const { devServerConfig } = require('./dev-server-config');

const SRC_PATH = path.resolve(__dirname, '../src');

module.exports = (env, options) => {
    const isDev = options.mode === 'development';
    return {
        resolve: {
            modules: [SRC_PATH, 'node_modules'],
            extensions: ['.js']
        },
        entry: `${SRC_PATH}/index.js`,
        devtool: 'source-map',
        output: {
            publicPath: '/',
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js'
        },
        optimization: isDev ? {
            minimize: false
        } : {
            minimize: true,
            nodeEnv: 'production',
            removeAvailableModules: true,
            mergeDuplicateChunks: true,
            occurrenceOrder: true,
            mangleWasmImports: true,
            removeEmptyChunks: true,
            providedExports: true,
            usedExports: true,
            concatenateModules: true,
            runtimeChunk: {
                name: entrypoint => `runtime~${entrypoint.name}`
            },
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        ie8: false,
                        safari10: false,
                        keep_classnames: true
                    }
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: true }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                strictMath: false,
                                noIeCompat: true,
                                javascriptEnabled: true,
                                modifyVars: palette
                            }
                        }
                    ],
                    include: [
                        path.resolve(__dirname, '../src'),
                        path.resolve(__dirname, '../node_modules')
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './public/index.html',
                filename: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ],
        devServer: {
            contentBase: [path.join(__dirname, '../public'), path.join(__dirname, '../dist')],
            inline: true,
            compress: true,
            port: devServerConfig.port,
            proxy: devServerConfig.proxy,
            open: devServerConfig.open,
            historyApiFallback: true
        }
    };
};
