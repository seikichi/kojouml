// tslint:disable:no-var-requires
// tslint:disable:object-literal-sort-keys

import { Configuration } from 'webpack';

const config: Configuration = {
  resolve: {
    extensions: ['.ts', '.pegjs'],
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader',
      },
    ],
  },
};

export default config;
