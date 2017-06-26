import * as parser from '../../src/parser';
import * as dot from '../../src/dot';

test('simple link', () => {
  const {
    nodes: [
      { id: i1, attributes: { label: l1 } },
      { id: i2, attributes: { label: l2 } },
    ],
    edges: [{ lhs: i3, rhs: i4 }],
  } = dot.fromDiagram(parser.parse('A -- B'));

  expect([l1, l2]).toEqual(['A', 'B']);
  expect([i3, i4]).toEqual([i1, i2]);
});

xtest('multiple links', () => {
  const {
    nodes: [
      { id: i1, attributes: { label: l1 } },
      { id: i2, attributes: { label: l2 } },
      { id: i3, attributes: { label: l3 } },
      { id: i4, attributes: { label: l4 } },
    ],
    edges: [{ lhs: i5, rhs: i6 }, { lhs: i7, rhs: i8 }, { lhs: i9, rhs: i10 }],
  } = dot.fromDiagram(
    parser.parse(`
A -- B
B -- C
A -- D
`),
  );

  expect([l1, l2, l3, l4]).toEqual(['A', 'B', 'C', 'D']);
  expect([i5, i6, i7, i8, i9, i10]).toEqual([i1, i2, i2, i3, i1, i4]);
});
