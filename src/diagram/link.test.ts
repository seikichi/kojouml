import * as parser from '../parser';
import * as diagram from '.';

const { objectContaining } = expect;

const tests: [string, string, diagram.Diagram][] = [
  [
    'simple link',
    'A -- B',
    {
      type: 'class_diagram',
      children: [
        objectContaining({ type: 'class', id: 'A', name: 'A' }),
        objectContaining({ type: 'class', id: 'B', name: 'B' }),
      ],
      links: [
        {
          type: 'link',
          left: { id: 'A' },
          right: { id: 'B' },
        },
      ],
    },
  ],
  [
    'multiple links',
    `
A -- B
B -- C
C -- A
C -- D
`,
    {
      type: 'class_diagram',
      children: [
        objectContaining({ type: 'class', id: 'A', name: 'A' }),
        objectContaining({ type: 'class', id: 'B', name: 'B' }),
        objectContaining({ type: 'class', id: 'C', name: 'C' }),
        objectContaining({ type: 'class', id: 'D', name: 'D' }),
      ],
      links: [
        {
          type: 'link',
          left: { id: 'A' },
          right: { id: 'B' },
        },
        {
          type: 'link',
          left: { id: 'B' },
          right: { id: 'C' },
        },
        {
          type: 'link',
          left: { id: 'C' },
          right: { id: 'A' },
        },
        {
          type: 'link',
          left: { id: 'C' },
          right: { id: 'D' },
        },
      ],
    },
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () =>
    expect(diagram.from(parser.parse(source))).toEqual(expected),
  );
});
