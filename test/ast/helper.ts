import { ContextualTestContext } from 'ava';
import * as AST from '../../src/ast';

export function macro(t: ContextualTestContext, input: string, expected: AST.Diagram) {
  t.deepEqual(AST.parse(input), expected);
}

export function diagramMacro(t: ContextualTestContext, input: string, expected: AST.Entity[]) {
  t.deepEqual(AST.parse(input), { type: 'diagram', children: expected });
}
