import test from 'ava';
import { diagramMacro } from './helper';

test(diagramMacro, 'A -- B', [{
  type: 'link',
  left: { name: 'A' },
  right: { name: 'B' },
  label: null,
}]);

test(diagramMacro, '"A A" -- " B" : Hello, world!', [{
  type: 'link',
  left: { name: 'A A' },
  right: { name: ' B' },
  label: 'Hello, world!',
}]);
