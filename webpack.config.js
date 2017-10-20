const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
console.log('============================================')
console.log('isProd: %s', isProd)
console.log('env: %s', process.NODE_ENV);
console.log('============================================')
const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './www');

const extractCSS = new ExtractTextPlugin({ filename: 'style.css', allChunks: true });

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  extractCSS,
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    API_PATH: isProd ? JSON.stringify('http://isoft.hldns.ru:1025') : JSON.stringify('http://127.0.0.1:1025')
  }),
  new HtmlWebpackPlugin({
    template: `${sourcePath}/index.ejs`,
    production: isProd,
    inject: true
  })
];

const jsEntry = [
  'index'
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

const stylesLoader = [
  `css-loader?modules&importLoaders=1&localIdentName=[path]_[local]`,
  'stylus-loader'
]

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  context: sourcePath,
  entry: {
    js: jsEntry,
    vendor: [
      'react',
      'ramda',
      'react-router-dom',
      'react-dom',
      'react-redux',
      'redux',
      'redux-logger',
      'redux-thunk'
    ]
  },
  output: {
    path: staticsPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [

      {
        test: /\.scss$/,
        loaders: isProd ? extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }) : ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loader: isProd ? extractCSS.extract(['css-loader']) : ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true
            }
          }
        ]
      },
      { test: /\.styl$/, exclude: /node_modules/, use: ['style-loader'].concat(stylesLoader) },
      {
        test: /\.(gif|png|jpg|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      'node_modules'
    ]
  },
  plugins,
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    port: 3000,
    hot: true,
    compress: isProd,
    stats: { colors: true }
  }
};
