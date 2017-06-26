import * as parser from '../../src/parser';

const tests: [string, string, parser.Diagram][] = [
  [
    'simple caption',
    'caption Hello, world!\n',
    { children: [{ type: 'caption', value: 'Hello, world!' }] },
  ],
  [
    'caption with newline',
    'caption line1\\nline2\n',
    { children: [{ type: 'caption', value: 'line1\\nline2' }] },
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () => expect(parser.parse(source)).toEqual(expected));
});
