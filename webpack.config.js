const path = require('path');
const bundleOutputDir = './dist';

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/index.tsx',
        devtool: 'cheap-module-source-map',
        mode: 'production',
        target: "node",
        output: {
            filename: 'index.js',
            path: path.resolve(bundleOutputDir),
            library: 'widget',
            libraryTarget:'umd'
        },
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
