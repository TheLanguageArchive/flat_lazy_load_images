const path  = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'flat-lazy.js',
        path: path.resolve(__dirname, 'js'),
    },

    // enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
    ]
};
