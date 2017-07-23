export type Id = string;

export interface Graph {
  readonly type: 'digraph';
  readonly attributes?: {
    readonly graph?: Attributes;
    readonly node?: Attributes;
    readonly edge?: Attributes;
  };
  readonly nodes: Node[];
  readonly edges: Edge[];
}

export interface Attributes {
  readonly type: 'attributes';
  readonly [key: string]: string | number | boolean;
}

export const defaultAttributes: Attributes = { type: 'attributes' };

export interface Edge {
  readonly type: 'edge';
  readonly left: Id;
  readonly right: Id;
  readonly attributes: Attributes;
}

export const defaultEdge: Edge = {
  type: 'edge',
  left: '',
  right: '',
  attributes: { ...defaultAttributes },
};

export interface Node {
  readonly type: 'node';
  readonly id: Id;
  readonly attributes: Attributes;
}

export const defaultNode: Node = {
  type: 'node',
  id: '',
  attributes: { ...defaultAttributes },
};
