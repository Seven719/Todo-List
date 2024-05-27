const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        filename: 'main-[contenthash].js',
        assetModuleFilename: 'css/[name]-[hash][ext]',
    },
    plugins: [
        new MiniCssExtractPlugin({ 
            filename: 'style.css'
        }),
    ],
    module: {
        rules: [
            {
                test:/\.css$/,
                include: path.resolve(__dirname, 'css/'),
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader"
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]-[hash][ext]'
                }
            }

        ]
    }
});
