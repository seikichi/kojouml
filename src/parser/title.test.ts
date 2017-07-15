import { Diagram, parse } from '.';

const tests: [string, string, Diagram][] = [
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
  test(name, () => expect(parse(source)).toEqual(expected));
});
