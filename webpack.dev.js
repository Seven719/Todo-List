const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
    mode: 'development',
    devtool: false,
    output: {
        filename: 'main.js',
        assetModuleFilename: 'css/[name][ext]',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'css/'),
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            }
        ]
    },
});
