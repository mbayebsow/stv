import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import * as path from "node:path";

rules.push({
  test: /\.css$/,
  // use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
  include: [path.resolve(__dirname, 'src')], //[webpackPaths.srcRendererPath],
  use: [{loader:'style-loader'}, {loader:'css-loader'}, {loader:'postcss-loader'}],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
