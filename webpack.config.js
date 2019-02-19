var production = process.env.NODE_ENV === 'production';

var webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  Dotenv = require('dotenv-webpack'),
  { CheckerPlugin } = require('awesome-typescript-loader'),
  CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: production ? 'production' : 'development',
  context: __dirname,
  entry: ['./src/main.ts'],
  output: {
    filename: '[hash]-bundle.js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  devtool: production ? false : 'inline-source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.scss', '.css']
  },
  optimization: {
    splitChunks: {
      chunks: 'initial'
    }
  },
  module: {
    rules: [
      { test: /\.tsx?$/, enforce: 'pre', loader: 'tslint-loader' },// options: { emitErrors: production } },
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: path.resolve(__dirname, 'node_modules') },
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader?minimize' // translates CSS into CommonJS
        }, {
          loader: 'group-css-media-queries-loader' // arrange and grouping media queries
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')(),
            ]
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'assets/[name].[ext]'
        }
      }, {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: production ? process.env.PROJECT_TITLE : `DEVELOPMENT - COMMIT ${process.env.COMMIT || 'n/a'} - ${process.env.PROJECT_TITLE}`,
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new Dotenv({
      path: '.env',
      systemvars: true
    }),
    new CheckerPlugin()
  ]
};

// this includes a stack trace if a DeprecationWarning is output by webpack
process.traceDeprecation = true;
