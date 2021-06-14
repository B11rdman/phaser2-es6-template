const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.common.js");

module.exports = merge(base, {
  mode: "development",
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 8080,
    stats: "errors-only",
    watchOptions: {
      poll: true,
    },
  },
  watch: true,
  devtool: "source-map",
});
