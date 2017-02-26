// tslint:disable:no-var-requires
// tslint:disable:object-literal-sort-keys

import * as path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
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

module.exports = config;
