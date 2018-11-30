var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './index.js',
  output: {
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
