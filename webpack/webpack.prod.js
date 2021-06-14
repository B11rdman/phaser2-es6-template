const merge = require("webpack-merge");
const base = require("./webpack.common.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
  // optimization: {
  //   minimizer: [
  //     new UglifyJSPlugin({
  //       uglifyOptions: {
  //         compress: {
  //           unused: false,
  //         },
  //         mangle: {
  //           keep_fnames: true,
  //         },
  //       },
  //     }),
  //   ],
  // },
});
