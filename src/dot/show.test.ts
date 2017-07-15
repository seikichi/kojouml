import { show, Graph } from '.';

const tests: [string, Graph, string][] = [
  [
    'simple graph',
    {
      type: 'digraph',
      nodes: [{ id: 'A' }, { id: 'B' }],
      edges: [{ left: 'A', right: 'B' }],
    },
    `
digraph {
  A [];
  B [];
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
