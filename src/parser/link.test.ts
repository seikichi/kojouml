import { Diagram, parse } from '../../src/parser';

const { objectContaining: oc } = expect;

const tests: [string, string, Diagram][] = [
  [
    'simple link',
    'A -- B',
    {
      children: [
        oc({
          type: 'link',
          left: oc({
            node: { type: 'ident', value: 'A' },
          }),
          right: oc({ node: { type: 'ident', value: 'B' } }),
          line: { char: '-', length: 2 },
        }),
      ],
    },
  ],
  [
    'simple link with label',
    'A -- B : Hello, world!',
    {
      children: [
        oc({
          type: 'link',
          left: oc({ node: { type: 'ident', value: 'A' } }),
          right: oc({ node: { type: 'ident', value: 'B' } }),
          line: { char: '-', length: 2 },
          label: 'Hello, world!',
        }),
      ],
    },
  ],
  [
    'simple link with cardinality',
    'A "1" -- "0..*" B',
    {
      children: [
        oc({
          type: 'link',
          left: oc({
            node: { type: 'ident', value: 'A' },
            cardinality: '1',
          }),
          right: oc({
            node: { type: 'ident', value: 'B' },
            cardinality: '0..*',
          }),
          line: { char: '-', length: 2 },
        }),
      ],
    },
  ],
  [
    'simple link with heads',
    'A <--> B',
    {
      children: [
        oc({
          type: 'link',
          left: oc({
            node: { type: 'ident', value: 'A' },
            head: '<',
          }),
          right: oc({
            node: { type: 'ident', value: 'B' },
            head: '>',
          }),
          line: { char: '-', length: 2 },
        }),
      ],
    },
  ],
  [
    'simple link with direction',
    'A -up- B',
    {
      children: [
        oc({
          type: 'link',
          left: oc({ node: { type: 'ident', value: 'A' } }),
          right: oc({ node: { type: 'ident', value: 'B' } }),
          line: { char: '-', length: 2, direction: 'up' },
        }),
      ],
    },
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () => expect(parse(source)).toEqual(expected));
});
