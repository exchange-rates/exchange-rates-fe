import path from 'path';
import webpack from 'webpack';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import autoprefixer from 'autoprefixer';
import config from './src/config';

const GLOBALS = {
  'process.env': {}
};

const { port } = config;

function devEntry(entry) {
  return [
    'webpack-dev-server/client?http://localhost:' + (port + 1),
    'webpack/hot/dev-server',
    entry
  ];
};

const cwd = process.cwd();

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: devEntry('./src/client.jsx')
  },
  target: 'web',
  output: {
    // Note: Physical files are only output by the production build task `npm run build`.
    path: path.join (cwd, '/dist/assets'),
    publicPath: 'http://localhost:' + (port + 1) + '/assets/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 4000,
      proxy: `http://localhost:${config.port + 1}/`,
      injectChanges: true,
      open: 'local'
    }, { reload: false }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [ // <---- postcss configs go here under LoadOptionsPlugin({ options: { ??? } })
          autoprefixer
        ]
      }
    }),
    new webpack.DefinePlugin(GLOBALS), // Define variables that appear as variable webpack bundling
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      { test: /\.jsx?$/, loaders: ['react-hot-loader'], exclude: /node_modules/, enforce: 'post' }
    ],
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hotOnly: true,
    port: port + 1,
    historyApiFallback: true,
    publicPath: 'http://localhost:' + (port + 1) + '/assets/',
    proxy: {
      "/assets/": `http://localhost:${port + 1}`,
      "/": `http://localhost:${port}`
    }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};