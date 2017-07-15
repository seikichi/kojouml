import { Diagram, parse } from '.';

const tests: [string, string, Diagram][] = [
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
  test(name, () => expect(parse(source)).toEqual(expected));
});
