import * as parser from '../parser';
import * as diagram from '../diagram';
import * as dot from '.';

const tests: [string, string, dot.Graph][] = [
  [
    'simple link',
    'A -- B',
    {
      type: 'digraph',
      nodes: [{ id: 'A' }, { id: 'B' }],
      edges: [{ left: 'A', right: 'B' }],
    },
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () =>
    expect(dot.from(diagram.from(parser.parse(source)))).toEqual(expected),
  );
});
