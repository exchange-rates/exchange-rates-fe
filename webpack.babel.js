import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import Visualizer from 'webpack-visualizer-plugin';

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
};

const cwd = process.cwd();

export default {
  entry: {
    main: path.join(cwd, './src/client.jsx')
  },
  target: 'web',
  output: {
    // Note: Physical files are only output by the production build task `npm run build`.
    path: path.join(cwd, '/dist/assets'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [ // <---- postcss configs go here under LoadOptionsPlugin({ options: { ??? } })
          autoprefixer
        ]
      }
    }),
    new webpack.DefinePlugin(GLOBALS), // Define variables that appear as variable webpack bundling
    new Visualizer({
      filename: './statistics.html'
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }
};