import * as parser from '../../src/parser';

const tests: [string, string, parser.Diagram][] = [
  [
    'simple title',
    'title Hello, world!\n',
    { children: [{ type: 'title', value: 'Hello, world!' }] },
  ],
  [
    'title with newline',
    'title line1\\nline2\n',
    { children: [{ type: 'title', value: 'line1\\nline2' }] },
  ],
  [
    'multiline title',
    `\
title
Hello,
world!
end title
`,
    { children: [{ type: 'title', value: 'Hello,\nworld!\n' }] },
  ],
];

tests.forEach(([name, source, expected]) => {
  test(name, () => expect(parser.parse(source)).toEqual(expected));
});
