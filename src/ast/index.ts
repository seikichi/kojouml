const Diagram: any = require('./diagram');

export interface Diagram {
  type: 'diagram';
  children: Entity[];
}

export type Entity = Title | Caption | Link | Package | Namespace;

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

export interface Link {
  type: 'link';
  // left: {
  //   name: string;
  //   cardinality?: string;
  //   head?: '<|' | '<' | '^' | '+' | 'o' | 'x' | '*' | '#'
  // };
  // right: {
  //   name: string;
  //   cardinality?: string;
  //   head?: '|>' | '>' | '^' | '+' | 'o' | 'x' | '*' | '#'
  // };
  // line: {
  //   char: '-' | '.' | '=';
  //   length: number;
  // }
  // label?: string;
  // direction?: 'left' | 'right' | 'up' | 'down';
}

export function parse(source: string): Diagram {
  return Diagram.parse(source);
}
