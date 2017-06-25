const uml: any = require('./uml');

export interface UML {
  type: 'uml';
  children: Entity[];
}

export type Entity = Title | Caption | Link | Package | Namespace | Comment;

export interface Title {
  type: 'title';
  value: string;
}

export interface Caption {
  type: 'caption';
  value: string;
}

export interface Package {
  type: 'package';
  name?: string;
  stereotype?: string;
  // color?: string;
  children: Entity[];
}

export interface Namespace {
  type: 'namespace';
  name: string;
  stereotype?: string;
  // color?: string;
  children: Entity[];
}

export interface Comment {
  type: 'comment';
  value: string;
}

export interface Link {
  type: 'link';
  left: {
    name: string;
    // cardinality?: string;
    // head?: '<|' | '<' | '^' | '+' | 'o' | 'x' | '*' | '#'
  };
  right: {
    name: string;
    // cardinality?: string;
    // head?: '|>' | '>' | '^' | '+' | 'o' | 'x' | '*' | '#'
  };
  // line: {
  //   char: '-' | '.' | '=';
  //   length: number;
  // }
  label?: string;
  // direction?: 'left' | 'right' | 'up' | 'down';
}

export function parse(source: string): UML {
  return uml.parse(source);
}
