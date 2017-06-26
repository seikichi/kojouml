const parser: any = require('./parser');

export function parse(source: string): Diagram {
  return parser.parse(source);
}

export interface Diagram {
  children: Element[];
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

export interface Link {
  type: 'link';
}

// export interface Link {
//   type: 'link';
//   left: {
//     name: string;
//     // cardinality?: string;
//     // head?: '<|' | '<' | '^' | '+' | 'o' | 'x' | '*' | '#'
//   };
//   right: {
//     name: string;
//     // cardinality?: string;
//     // head?: '|>' | '>' | '^' | '+' | 'o' | 'x' | '*' | '#'
//   };
//   // line: {
//   //   char: '-' | '.' | '=';
//   //   length: number;
//   // }
//   label?: string;
//   // direction?: 'left' | 'right' | 'up' | 'down';
// }
