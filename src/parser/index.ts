import { Diagram } from './records';

const parser: { parse: (source: string) => Diagram } = require('./parser');

export function parse(source: string): Diagram {
  return parser.parse(source);
}

export * from './records';
