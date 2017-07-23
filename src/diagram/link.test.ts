import * as parser from '../parser';
import * as diagram from '.';

const { objectContaining: oc } = expect;

const tests: [string, string, diagram.Diagram][] = [
  [
    'simple link',
    'A -- B',
    {
      type: 'class_diagram',
      children: [
        oc({ type: 'class', id: 'A', name: 'A' }),
        oc({ type: 'class', id: 'B', name: 'B' }),
      ],
      links: [
        oc({
          type: 'link',
          left: oc({ id: 'A' }),
          right: oc({ id: 'B' }),
        }),
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
        oc({ type: 'class', id: 'A', name: 'A' }),
        oc({ type: 'class', id: 'B', name: 'B' }),
        oc({ type: 'class', id: 'C', name: 'C' }),
        oc({ type: 'class', id: 'D', name: 'D' }),
      ],
      links: [
        oc({
          type: 'link',
          left: oc({ id: 'A' }),
          right: oc({ id: 'B' }),
        }),
        oc({
          type: 'link',
          left: oc({ id: 'B' }),
          right: oc({ id: 'C' }),
        }),
        oc({
          type: 'link',
          left: oc({ id: 'C' }),
          right: oc({ id: 'A' }),
        }),
        oc({
          type: 'link',
          left: oc({ id: 'C' }),
          right: oc({ id: 'D' }),
        }),
      ],
    },
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () =>
    expect(diagram.from(parser.parse(source))).toEqual(expected),
  );
});
