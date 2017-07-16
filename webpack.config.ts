// tslint:disable:no-var-requires
// tslint:disable:object-literal-sort-keys

import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import config from './webpack.config.shared';

export default merge(config, {
  devtool: 'source-map',

  performance: {
    hints: 'warning',
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
  ],
});
