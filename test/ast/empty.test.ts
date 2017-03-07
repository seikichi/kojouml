import test from 'ava';
import * as AST from '../../src/ast';

test(t => {
  t.deepEqual(AST.parse(''), { type: 'diagram', children: [] as AST.Entity[] });
});

test(t => {
  const input = `\
@startuml
@enduml
`;
  t.deepEqual(AST.parse(input), { type: 'diagram', children: [] as AST.Entity[] });
});
