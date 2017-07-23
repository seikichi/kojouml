export interface Diagram {
  readonly children: ReadonlyArray<Element>;
}

export type Element = Title | Caption | Comment | Link | Class;

export function isClass(element: Element): element is Class {
  return element.type === 'class';
}

export function isLink(element: Element): element is Link {
  return element.type === 'link';
}

export interface Title {
  readonly type: 'title';
  readonly value: string;
}

export const defaultTitle: Title = { type: 'title', value: '' };

export interface Caption {
  readonly type: 'caption';
  readonly value: string;
}

export const defaultCaption: Caption = { type: 'caption', value: '' };

export interface Comment {
  readonly type: 'comment';
  readonly value: string;
}

export const defaultComment: Comment = { type: 'comment', value: '' };

export type Node = IdentNode;

export interface IdentNode {
  readonly type: 'ident';
  readonly value: string;
}

export type LinkLeftHead = '<|' | '<' | '^' | '+' | 'o' | 'x' | '*' | '#';
export type LinkRightHead = '|>' | '>' | '^' | '+' | 'o' | 'x' | '*' | '#';
export type Direction =
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

export interface Link {
  readonly type: 'link';
  readonly left: {
    readonly node: Node;
    readonly cardinality?: string;
    readonly head?: LinkLeftHead;
  };
  readonly right: {
    readonly node: Node;
    readonly cardinality?: string;
    readonly head?: LinkRightHead;
  };
  readonly line: {
    readonly char: '-' | '.' | '=';
    readonly length: number;
    readonly direction?: Direction;
  };
  readonly label?: string;
}

export interface Method {
  readonly name: string;
}

export interface Field {
  readonly name: string;
}

export type LineStyle = 'dotted' | 'dashed' | 'bold';

export interface LineColor {
  readonly color: string;
  readonly style?: LineStyle;
}

export interface Color {
  readonly name: string;
}

export type ClassType =
  | 'interface'
  | 'enum'
  | 'annotation'
  | 'abstract class'
  | 'abstract'
  | 'class'
  | 'entity';

export interface Class {
  readonly type: 'class';
  readonly subtype: ClassType;
  readonly name: string;
  readonly methods: ReadonlyArray<Method>;
  readonly fields: ReadonlyArray<Field>;
  readonly generic?: string;
  readonly stereoType?: string;
  readonly color?: Color;
  readonly lineColor?: LineColor;
  readonly parents: ReadonlyArray<string>;
  readonly interfaces: ReadonlyArray<string>;
}

export const defaultClass: Class = {
  type: 'class',
  subtype: 'class',
  name: '',
  methods: [],
  fields: [],
  parents: [],
  interfaces: [],
};
