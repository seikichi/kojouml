import { test } from 'ava';
import { umlMacro } from './helper';

test(umlMacro, `
namespace a {
  namespace b {
  }
}`, [{
  type: 'namespace',
  name: 'a',
  stereoType: null,
  children: [{
    type: 'namespace',
    name: 'b',
    stereoType: null,
    children: [],
  }],
}]);
