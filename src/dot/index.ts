import * as diagram from '../diagram';
import * as _ from 'lodash';

export function show(graph: Graph): string {
  const nodes = graph.nodes.map(node => `${node.id} [];`);
  const edges = graph.edges.map(edge => `${edge.left} -> ${edge.right} [];`);
  return ['digraph {', ...nodes, ...edges, '}'].join('\n');
}

export function from(d: diagram.Diagram): Graph {
  const type = 'digraph';
  const edges = _.chain(d.links)
    .map((link: diagram.Link): Edge => ({
      left: link.left.id,
      right: link.right.id,
    }))
    .value();
  const nodes = _.chain(d.children)
    .map(({ id }: diagram.Element): Node => ({ id }))
    .value();

  return { type, nodes, edges };
}

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

export interface Edge {
  readonly left: Id;
  readonly right: Id;
  readonly attributes?: Attributes;
}

export interface Node {
  readonly id: Id;
  readonly attributes?: Attributes;
}

export interface Attributes {
  readonly [key: string]: string | number;
}
