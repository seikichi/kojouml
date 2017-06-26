const parser: any = require('./parser');

export function parse(source: string): Diagram {
  return parser.parse(source);
}

export interface Diagram {
  children: ReadonlyArray<Element>;
}

export type Element = Title | Caption | Comment | Link;

export interface Title {
  type: 'title';
  value: string;
}

export interface Caption {
  type: 'caption';
  value: string;
}

export interface Comment {
  type: 'comment';
  value: string;
}

export type Node = EntityNode;

export interface EntityNode {
  type: 'entity';
  value: string;
}

export interface Link {
  type: 'link';
  left: {
    node: Node;
    cardinality?: string;
    head?: '<|' | '<' | '^' | '+' | 'o' | 'x' | '*' | '#';
  };
  right: {
    node: Node;
    cardinality?: string;
    head?: '|>' | '>' | '^' | '+' | 'o' | 'x' | '*' | '#';
  };
  line: {
    char: '-' | '.' | '=';
    length: number;
    direction?:
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
  label?: string;
}
