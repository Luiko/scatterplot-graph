const CleanWebpackPlugin = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('client'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextWebpackPlugin('style.css')
  ]
}
