import { show, Graph, defaultNode, defaultEdge } from '.';

const tests: [string, Graph, string][] = [
  [
    'simple graph',
    {
      type: 'digraph',
      nodes: [
        {
          ...defaultNode,
          id: 'A',
          attributes: { type: 'attributes', shape: 'record' },
        },
        {
          ...defaultNode,
          id: 'B',
          attributes: { type: 'attributes', shape: 'record' },
        },
      ],
      edges: [{ ...defaultEdge, left: 'A', right: 'B' }],
    },
    `
digraph {
  A [shape="record"];
  B [shape="record"];
  A -> B [];
}
`,
  ],
];

const normalize = (s: string) => {
  return s.split('\n').map(s => s.replace(/\s+/g, '')).filter(s => s !== '');
};

tests.forEach(([name, graph, source]) => {
  const actual = normalize(show(graph));
  const expected = normalize(source);
  test(name, () => expect(actual).toEqual(expected));
});
