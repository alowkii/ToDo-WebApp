const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
        hot: true,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|jpg|jpeg|webp)$/i,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext][query]",
                },
            },
            {
                test: /\.js$/, // Check for .js files
                exclude: /node_modules/, // Exclude node_modules
                use: {
                  loader: 'babel-loader', // Use Babel to transpile
                },
            },
        ],
    },
};
