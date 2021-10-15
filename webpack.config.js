const fs = require('fs');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const { PWD, NODE_ENV } = process.env;
const isProduction = process.env.NODE_ENV == 'production';

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src', 'index.html'),
  }),
];

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  devServer: {
    open: true,
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|eps|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = () => {
  let hasAssets = false;
  try {
    hasAssets = !!fs.readdirSync(path.resolve(__dirname, 'src', 'assets'));
    if (hasAssets) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              force: true,
              from: path.resolve(__dirname, 'src', 'assets'),
              to: 'assets',
              context: path.resolve(PWD),
            },
          ],
        }),
      );
    }
  }
  catch (error) {}
  
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = 'development';
  }

  return config;
};
