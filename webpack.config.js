const path = require("path");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  entry: "./server.js", // Entry point of your application
  target: "node", // Specify the target as Node.js
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Output file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: "./.env", // Path to your .env file (this is the default)
    }),
  ],
};
