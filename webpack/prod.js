<<<<<<< HEAD
const merge = require("webpack-merge");
// const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");
=======
const merge = require('webpack-merge');
// const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./base');
>>>>>>> feature/game-setup

module.exports = merge(base, {
  mode: 'production',
  output: {
<<<<<<< HEAD
    filename: "bundle.min.js",
    // path: path.resolve(__dirname, 'dist'),
=======
    filename: 'bundle.min.js',
    // path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'assets/[hash][ext][query]',
>>>>>>> feature/game-setup
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
<<<<<<< HEAD
    maxAssetSize: 900000
=======
    maxAssetSize: 900000,
>>>>>>> feature/game-setup
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
