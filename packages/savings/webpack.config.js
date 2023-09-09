const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

const mode = process.env.NODE_ENV || "production";

module.exports = {
  devServer: {
    hot: false,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
  },
  devtool: "source-map",
  entry: "./src/index",
  mode,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
    ],
  },
  optimization: {
    minimize: mode === "production",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "savings",
      remotes: {
        profile: "profile@http://localhost:3002/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".jsx", ".js"],
  },
};
