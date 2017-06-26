const ts = require('typescript');
const pegjs = require('pegjs');
const config = require('./tsconfig.json');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return ts.transpile(src, config.compilerOptions, path, []);
    } else if (path.endsWith('.pegjs')) {
      return pegjs.generate(src, {
        cache: false,
        format: 'commonjs',
        exportVar: null,
        optimize: 'speed',
        output: 'source',
        trace: false,
      });
    }
    return src;
  },
};
