import * as parser from '../parser';
import * as diagram from '../diagram';
import * as dot from '.';

const { objectContaining: oc } = expect;

const tests: [string, string, dot.Graph][] = [
  [
    'simple class',
    `
ArrayList : Object[] elementData
ArrayList : size()
`,
    oc({
      type: 'digraph',
      nodes: [
        oc({
          ...dot.defaultNode,
          id: 'ArrayList',
          attributes: oc({
            type: 'attributes',
            shape: 'record',
            fontname: 'monospace',
            label: `{ArrayList|Object[] elementData\\l|size()\\l}`,
          }),
        }),
      ],
      edges: [],
    }),
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () =>
    expect(dot.from(diagram.from(parser.parse(source)))).toEqual(expected),
  );
});
