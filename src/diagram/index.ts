import * as parser from '../parser';

export function from(_: parser.Diagram): Diagram {
  return {
    type: 'class_diagram',
    children: [],
    links: [],
  };
}

export type Diagram = ClassDiagram;
export type Id = string;

export interface ClassDiagram {
  type: 'class_diagram';
  readonly children: ReadonlyArray<Element>;
  readonly links: ReadonlyArray<Link>;
}

export interface Class {
  readonly type: 'class';
  readonly id: Id;
  readonly name: string;
}

export interface Link {
  readonly type: 'link';
  readonly left: {
    readonly id: Id;
    readonly cardinality?: string;
    readonly head?: '<|' | '<' | '^' | '+' | 'o' | 'x' | '*' | '#';
  };
  readonly right: {
    readonly id: Id;
    readonly cardinality?: string;
    readonly head?: '|>' | '>' | '^' | '+' | 'o' | 'x' | '*' | '#';
  };
}

export type Element = Class;
