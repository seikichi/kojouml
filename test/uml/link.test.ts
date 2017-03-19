import test from 'ava';
import { umlMacro } from './helper';

test(umlMacro, 'A -- B', [{
  type: 'link',
  left: { name: 'A' },
  right: { name: 'B' },
  label: null,
}]);

test(umlMacro, '"A A" -- " B" : Hello, world!', [{
  type: 'link',
  left: { name: 'A A' },
  right: { name: ' B' },
  label: 'Hello, world!',
}]);
