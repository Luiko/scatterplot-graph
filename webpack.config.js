const CleanWebpackPlugin = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/docs'
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
    new CleanWebpackPlugin('docs'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextWebpackPlugin('style.css')
  ]
}
