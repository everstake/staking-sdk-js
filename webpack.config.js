const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './staking-sdk-js';
// const NpmDtsPlugin = require('npm-dts-webpack-plugin')

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/index.tsx',
        mode: 'production',
        output: {
            filename: 'index.js',
            path: path.resolve(bundleOutputDir),
        },
        // plugins: [
        //     new NpmDtsPlugin({
        //         logLevel: 'debug'
        //     })
        // ],
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ['ts-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ],
        },
        devServer: {
            contentBase: bundleOutputDir
        },
    }];
};
