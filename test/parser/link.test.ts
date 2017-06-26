import * as parser from '../../src/parser';

const tests: [string, string, parser.Diagram][] = [
  [
    'simple link',
    'A -- B',
    {
      children: [
        {
          type: 'link',
          left: { node: { type: 'entity', value: 'A' } },
          right: { node: { type: 'entity', value: 'B' } },
          line: { char: '-', length: 2 },
        },
      ],
    },
  ],
  [
    'simple link with label',
    'A -- B : Hello, world!',
    {
      children: [
        {
          type: 'link',
          left: { node: { type: 'entity', value: 'A' } },
          right: { node: { type: 'entity', value: 'B' } },
          line: { char: '-', length: 2 },
          label: 'Hello, world!',
        },
      ],
    },
  ],
  [
    'simple link with cardinality',
    'A "1" -- "0..*" B',
    {
      children: [
        {
          type: 'link',
          left: { node: { type: 'entity', value: 'A' }, cardinality: '1' },
          right: { node: { type: 'entity', value: 'B' }, cardinality: '0..*' },
          line: { char: '-', length: 2 },
        },
      ],
    },
  ],
  [
    'simple link with heads',
    'A <--> B',
    {
      children: [
        {
          type: 'link',
          left: { node: { type: 'entity', value: 'A' }, head: '<' },
          right: { node: { type: 'entity', value: 'B' }, head: '>' },
          line: { char: '-', length: 2 },
        },
      ],
    },
  ],
  [
    'simple link with direction',
    'A -up- B',
    {
      children: [
        {
          type: 'link',
          left: { node: { type: 'entity', value: 'A' } },
          right: { node: { type: 'entity', value: 'B' } },
          line: { char: '-', length: 2, direction: 'up' },
        },
      ],
    },
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () => expect(parser.parse(source)).toEqual(expected));
});
