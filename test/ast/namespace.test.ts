import { test } from 'ava';
import { diagramMacro } from './helper';

test(diagramMacro, `
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
