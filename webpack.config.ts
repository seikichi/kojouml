// tslint:disable:no-var-requires
// tslint:disable:object-literal-sort-keys

import * as path from 'path';
import * as merge from 'webpack-merge';
import config from './webpack.config.shared';

export default merge(config, {
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
});
