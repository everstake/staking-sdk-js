const path = require('path');
const bundleOutputDir = './staking-sdk-js';
const CopyPlugin = require('copy-webpack-plugin');
const DtsBundleWebpack = require('dts-bundle-webpack')

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/index.tsx',
        devtool: 'cheap-module-source-map',
        mode: 'production',
        output: {
            filename: 'index.js',
            path: path.resolve(bundleOutputDir),
            library: 'staking-sdk-js',
            libraryTarget: 'umd'
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: './sdk-package.json', to: `package.json` },
                    { from: './README.md', to: `README.md` },
                ]
            }),

            new DtsBundleWebpack({
                baseDir: bundleOutputDir,
                main: `staking-sdk-js/src/index.d.ts`,
                out: `index.d.ts`,
                name: 'staking-sdk-js',
                outputAsModuleFolder: true})
        ],
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
