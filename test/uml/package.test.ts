import { test } from 'ava';
import { umlMacro } from './helper';

test(umlMacro, `
package {
}
`, [{ type: 'package', name: null, stereoType: null, children: [] }]);

test(umlMacro, `
package p {
}
`, [{ type: 'package', name: 'p', stereoType: null, children: [] }]);

test(umlMacro, `
package p1 {
  package p2 {
    package p3 {
    }
  }
}
`, [{
  type: 'package',
  name: 'p1',
  stereoType: null,
  children: [{
    type: 'package',
    name: 'p2',
    stereoType: null,
    children: [{
      type: 'package',
      name: 'p3',
      stereoType: null,
      children: [],
    }],
  }],
}]);
