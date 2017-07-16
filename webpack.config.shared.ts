// tslint:disable:no-var-requires
// tslint:disable:object-literal-sort-keys

import * as path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  target: 'node',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.pegjs'],
  },
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
