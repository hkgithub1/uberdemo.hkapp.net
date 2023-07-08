const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

require("dotenv").config();

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
};
