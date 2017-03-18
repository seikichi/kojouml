import { test } from 'ava';
import { diagramMacro } from './helper';

test(diagramMacro, `
package {
}
`, [{ type: 'package', name: null, stereoType: null, children: [] }]);

test(diagramMacro, `
package p {
}
`, [{ type: 'package', name: 'p', stereoType: null, children: [] }]);

test(diagramMacro, `
package p {
  A -- B
}
`, [{ type: 'package', name: 'p', stereoType: null, children: [{ type: 'link' }] }]);

test(diagramMacro, `
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
