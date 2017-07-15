import * as parser from '../parser';
import * as diagram from '.';

const tests: [string, string, diagram.Diagram][] = [
  [
    'simple link',
    'A -- B',
    {
      type: 'class_diagram',
      children: [
        { type: 'class', id: 'A', name: 'A' },
        { type: 'class', id: 'B', name: 'B' },
      ],
      links: [
        {
          type: 'link',
          left: { id: 'A' },
          right: { id: 'B' },
        },
      ],
    },
  ],
];

tests.forEach(([name, source, expected]) => {
  test.skip(name, () =>
    expect(diagram.from(parser.parse(source))).toEqual(expected),
  );
});
