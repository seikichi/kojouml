const Diagram: any = require('./diagram');

export interface Diagram {
  type: 'diagram';
  children: Entity[];
}

export type Entity = Title | Caption | Class;

export interface Title {
  type: 'title';
  value: string;
}

export interface Caption {
  type: 'caption';
  value: string;
}

export interface Class {
  type: 'class';
}

export function parse(source: string): Diagram {
  return Diagram.parse(source);
}
