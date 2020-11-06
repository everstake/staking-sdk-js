const path = require('path');
const bundleOutputDir = './staking-sdk-js';
// const NpmDtsPlugin = require('npm-dts-webpack-plugin')

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/index.tsx',
        devtool: 'cheap-module-source-map',
        mode: 'production',
        output: {
            filename: 'index.js',
            path: path.resolve(bundleOutputDir),
            library: 'widget',
            libraryTarget:'umd'
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
