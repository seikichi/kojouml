import * as parser from '../parser';

export type Diagram = ClassDiagram;
export type Id = string;

export interface ClassDiagram {
  type: 'class_diagram';
  readonly children: ReadonlyArray<Element>;
  readonly links: ReadonlyArray<Link>;
}

export interface Method {
  readonly name: string;
}

export interface Field {
  readonly name: string;
}

export interface Class {
  readonly type: 'class';
  readonly id: Id;
  readonly name: string;
  readonly methods: ReadonlyArray<Method>;
  readonly fields: ReadonlyArray<Field>;
}

export const defaultClass: Class = {
  type: 'class',
  id: '',
  name: '',
  methods: [],
  fields: [],
};

export type LinkLeftHead = parser.LinkLeftHead;
export type LinkRightHead = parser.LinkRightHead;

export interface Link {
  readonly type: 'link';
  readonly left: {
    readonly id: Id;
    readonly cardinality?: string;
    readonly head?: LinkLeftHead;
  };
  readonly right: {
    readonly id: Id;
    readonly cardinality?: string;
    readonly head?: LinkRightHead;
  };
  readonly line: {
    readonly char: '-' | '.' | '=';
    readonly length: number;
  };
  readonly label?: string;
}

export const defaultLink: Link = {
  type: 'link',
  left: {
    id: '',
  },
  right: {
    id: '',
  },
  line: {
    char: '-',
    length: 1,
  },
};

export type Element = Class;
