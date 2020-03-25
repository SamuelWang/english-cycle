const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  let configurations = {
    mode: devMode ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      filename: 'main.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      contentBase: './dist',
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'English Cycle',
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
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
  } else {
    configurations.optimization = {
      splitChunks: {
        chunks: 'all'
      },
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    };
  }

  return configurations;
};
