import * as parser from '../parser';
import * as diagram from '../diagram';
import * as dot from '.';

const { objectContaining } = expect;

const tests: [string, string, dot.Graph][] = [
  [
    'simple link',
    'A -- B',
    objectContaining({
      type: 'digraph',
      nodes: [objectContaining({ id: 'A' }), objectContaining({ id: 'B' })],
      edges: [objectContaining({ left: 'A', right: 'B' })],
    }),
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () =>
    expect(dot.from(diagram.from(parser.parse(source)))).toEqual(expected),
  );
});
