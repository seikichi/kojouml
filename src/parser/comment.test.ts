import { Diagram, parse } from '.';

const tests: [string, string, Diagram][] = [
  [
    'simple comment',
    "' comment",
    { children: [{ type: 'comment', value: 'comment' }] },
  ],
  [
    'comment with multiple whitespaces',
    "  '   comment",
    { children: [{ type: 'comment', value: 'comment' }] },
  ],
  [
    'multiline comments',
    `/'
1
2
'/`,
    {
      children: [{ type: 'comment', value: '\n1\n2\n' }],
    },
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () => expect(parse(source)).toEqual(expected));
});
