// tslint:disable:no-var-requires
// tslint:disable:object-literal-sort-keys

import * as merge from 'webpack-merge';
import config from './webpack.config.shared';

export default merge(config, {
  devtool: 'eval-source-map',
});
