const parser: { parse: (source: string) => Diagram } = require('./parser');

export function parse(source: string): Diagram {
  return parser.parse(source);
}

export interface Diagram {
  readonly children: ReadonlyArray<Element>;
}

export type Element = Title | Caption | Comment | Link | Class;

export interface Title {
  readonly type: 'title';
  readonly value: string;
}

export interface Caption {
  readonly type: 'caption';
  readonly value: string;
}

export interface Comment {
  readonly type: 'comment';
  readonly value: string;
}

export type Node = IdentNode;

export interface IdentNode {
  readonly type: 'ident';
  readonly value: string;
}

export interface Link {
  readonly type: 'link';
  readonly left: {
    readonly node: Node;
    readonly cardinality?: string;
    readonly head?: '<|' | '<' | '^' | '+' | 'o' | 'x' | '*' | '#';
  };
  readonly right: {
    readonly node: Node;
    readonly cardinality?: string;
    readonly head?: '|>' | '>' | '^' | '+' | 'o' | 'x' | '*' | '#';
  };
  readonly line: {
    readonly char: '-' | '.' | '=';
    readonly length: number;
    readonly direction?:
      | 'left'
      | 'le'
      | 'l'
      | 'right'
      | 'ri'
      | 'r'
      | 'up'
      | 'u'
      | 'down'
      | 'do'
      | 'd';
  };
  readonly label?: string;
}

export interface Class {
  readonly type: 'class';
  readonly name: string;
}
