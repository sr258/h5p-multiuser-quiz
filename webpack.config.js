const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";

module.exports = {
  mode: nodeEnv,
  optimization: {
    minimize: isProd,
    innerGraph: true,
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [],
  entry: {
    dist: "./src/H5PEntrypoint.ts",
  },
  output: {
    filename: "multiuser-quiz.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: ["web", "es5"], // IE11
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.svg|\.jpg|\.png$/,
        include: path.join(__dirname, "src/images"),
        type: "asset/resource",
      },
      {
        test: /\.woff$/,
        include: path.join(__dirname, "src/fonts"),
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  stats: {
    colors: true,
  },
  devtool: isProd ? undefined : "eval-cheap-module-source-map",
};
