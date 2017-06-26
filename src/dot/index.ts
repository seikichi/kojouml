import { Diagram } from '../parser';

interface Context {
  nodes: { [ident: string]: Node };
}

export function fromDiagram(_: Diagram): Graph {
  return {
    type: 'digraph',
    id: 'unix',
    attributes: {
      graph: {},
      node: {},
      edge: {},
    },
    nodes: [
      { id: 'shape0004', attributes: { label: 'A' } },
      { id: 'shape0005', attributes: { label: 'B' } },
    ],
    edges: [{ lhs: 'shape0004', rhs: 'shape0005', attributes: {} }],
  };
}

export interface Graph {
  type: 'graph' | 'digraph';
  id: string;
  attributes: {
    graph: Attributes;
    node: Attributes;
    edge: Attributes;
  };
  nodes: Node[];
  edges: Edge[];
}

export interface Node {
  id: string;
  attributes: Attributes;
}

export interface Edge {
  lhs: string;
  rhs: string;
  attributes: Attributes;
}

export interface Attributes {
  [key: string]: string | number;
}
