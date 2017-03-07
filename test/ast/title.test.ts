import test from 'ava';
import * as AST from '../../src/ast';

test(t => {
  const input = `\
title Hello, world!
`;
  t.deepEqual(AST.parse(input), {
    type: 'diagram', children: [{ type: 'title', value: 'Hello, world!'}],
  } as AST.Diagram);
});
