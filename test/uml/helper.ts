import { ContextualTestContext } from 'ava';
import * as uml from '../../src/uml';

export function macro(t: ContextualTestContext, input: string, expected: uml.UML) {
  t.deepEqual(uml.parse(input), expected);
}

export function diagramMacro(t: ContextualTestContext, input: string, expected: uml.Entity[]) {
  t.deepEqual(uml.parse(input), { type: 'diagram', children: expected });
}
