import * as parser from '../parser';
import * as diagram from '.';

const { objectContaining } = expect;

const tests: [string, string, diagram.Diagram][] = [
  [
    'simple class',
    `
Object <|-- ArrayList
Object : equals()
ArrayList : Object[] elementData
ArrayList : size()
`,
    {
      type: 'class_diagram',
      children: [
        {
          type: 'class',
          id: 'Object',
          name: 'Object',
          methods: [{ name: 'equals()' }],
          fields: [],
        },
        {
          type: 'class',
          id: 'ArrayList',
          name: 'ArrayList',
          methods: [{ name: 'size()' }],
          fields: [{ name: 'Object[] elementData' }],
        },
      ],
      links: [
        {
          type: 'link',
          left: objectContaining({ id: 'Object' }),
          right: objectContaining({ id: 'ArrayList' }),
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
