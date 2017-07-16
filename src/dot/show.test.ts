import { show, Graph } from '.';

const tests: [string, Graph, string][] = [
  [
    'simple graph',
    {
      type: 'digraph',
      nodes: [
        { id: 'A', attributes: { shape: 'record' } },
        { id: 'B', attributes: { shape: 'record' } },
      ],
      edges: [{ left: 'A', right: 'B', attributes: {} }],
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
