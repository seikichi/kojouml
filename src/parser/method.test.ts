import { Diagram, parse } from '.';

const tests: [string, string, Diagram][] = [
  [
    'simple method',
    'ArrayList : size()',
    {
      children: [
        expect.objectContaining({
          type: 'class',
          name: 'ArrayList',
          methods: [{ name: 'size()' }],
        }),
      ],
    },
  ],
  [
    'simple field',
    'ArrayList : Object[] elementData',
    {
      children: [
        expect.objectContaining({
          type: 'class',
          name: 'ArrayList',
          fields: [{ name: 'Object[] elementData' }],
        }),
      ],
    },
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () => expect(parse(source)).toEqual(expected));
});
