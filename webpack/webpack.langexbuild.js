/* global __dirname, module, process */
// const ASSET_PATH = process.env.ASSET_PATH || '../assets/'; // eslint-disable-line no-process-env
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require("./webpack.common.js");
const path = require('path');
const webpack = require('webpack');
const { merge }  = require("webpack-merge");
const HTMLWebpackPlugin = require('html-webpack-plugin');

const plugins = [
    new MiniCssExtractPlugin({filename: 'styles/converse.min.css'}),
    new CopyWebpackPlugin({
        patterns: [
            {from: 'node_modules/strophe.js/src/shared-connection-worker.js', to: 'scripts/shared-connection-worker.js'},
            {from: 'sounds', to: 'assets/sounds'},
            {from: 'images/favicon.ico', to: 'assets/images/favicon.ico'},
            {from: 'images/custom_emojis', to: 'assets/images/custom_emojis'},
            {from: 'images/logo.png', to: 'images/logo.png'},
            {from: 'logo/conversejs-filled-192.png', to: 'assets/images/logo'},
            {from: 'logo/conversejs-filled-512.png', to: 'assets/images/logo'},
            {from: 'logo/conversejs-filled-192.svg', to: 'assets/images/logo'},
            {from: 'logo/conversejs-filled-512.svg', to: 'assets/images/logo'},
            {from: 'logo/conversejs-filled.svg', to: 'assets/images/logo'},
            {from: 'src/shared/styles/webfonts', to: 'styles/webfonts'},
            {from: 'manifest.json', to: 'manifest.json'}
        ]
    }),
    // new webpack.DefinePlugin({ // This makes it possible for us to safely use env vars on our code
    //     'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    // }),
    new HTMLWebpackPlugin({
        title: 'Langex App',
        template: 'webpack.html',
        filename: 'index.html',
    }),
];

module.exports = merge(common, {
    plugins,
    entry: {
        "langex": path.resolve(__dirname, "../src/entry.js"),
        "langex.min": path.resolve(__dirname, "../src/entry.js"),
    },
    output: {
        assetModuleFilename: 'assets/[hash][ext][query]',
        filename: 'scripts/[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    mode: "production",
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: true
                    }
                },
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: [
                                path.resolve(__dirname, '../node_modules/'),
                                path.resolve(__dirname, '../src/')
                            ]
                        },
                        sourceMap: true
                    }
                },
            ]
        }, {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }
      ]
    }
});
