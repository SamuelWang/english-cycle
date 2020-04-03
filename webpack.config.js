const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const appSettings = require('./app-settings');

const devMode = process.env.NODE_ENV !== 'production';

let configurations = {
  mode: devMode ? 'development' : 'production',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js',
  ],
  output: {
    filename: devMode ? 'main.js' : 'main.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      googleClientId: appSettings.google.clientId
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
    new FaviconsWebpackPlugin('./src/images/favicon.png'),
    new VueLoaderPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: devMode,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.vue/,
        loader: 'vue-loader',
      },
    ],
  },
};

if (devMode) {
  configurations.devtool = 'source-map';
} else {
  configurations.optimization = {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  };
}

module.exports = configurations;
