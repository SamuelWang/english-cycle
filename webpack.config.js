const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devMode = process.env.NODE_ENV !== 'production';

let configurations = {
  mode: devMode ? 'development' : 'production',
  entry: ['./src/index.js'],
  output: {
    filename: devMode ? 'main.js' : 'main.[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
    new FaviconsWebpackPlugin('./src/images/favicon.png'),
    new VueLoaderPlugin(),
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
  configurations.devServer = {
    contentBase: path.resolve(__dirname, 'dist')
  };
} else {
  configurations.optimization = {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  };
}

module.exports = configurations;
