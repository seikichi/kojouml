// tslint:disable:no-var-requires
// tslint:disable:object-literal-sort-keys

import * as glob from 'glob';
import * as merge from 'webpack-merge';
import config from './webpack.config.shared';

const nodeExternals = require('webpack-node-externals');

export default merge(config, {
  entry: glob.sync('./test/**/*.ts').reduce((map, entry) => {
    map[entry.replace(/\.ts$/, '')] = entry;
    return map;
  }, <{ [key: string]: string }> {}),
  output: {
    filename: '[name].js',
  },
  externals: [nodeExternals()],
});
