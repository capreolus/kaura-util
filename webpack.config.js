// Author: Kaura Peura

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Modes = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
};

module.exports = (env) => {
    const mode = env != null ? env.mode : Modes.DEVELOPMENT;

    if (![...Object.values(Modes)].includes(mode)) {
        throw Error(`invalid value for env.mode: ${mode}`);
    }

    return {
        devtool: false,
        entry: {
            background: './src/background.ts',
            twitter: './src/twitter.ts'
        },
        mode,
        module: {
            rules: [{
                exclude: /node_modules/,
                test: /\.ts$/,
                use: 'ts-loader'
            }]
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, './dist')
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, './manifest.json'),
                to: path.resolve(__dirname, 'dist/manifest.json'),
            }])
        ],
        resolve: {
            extensions: ['.js', '.ts'],
            modules: [
                path.resolve(__dirname, 'src'),
                'node_modules'
            ]
        }
    };
};
