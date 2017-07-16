import * as _ from 'lodash';
import * as diagram from '../diagram';

export function show(graph: Graph): string {
  const nodes = graph.nodes.map(
    node => `${node.id} [${showAttribuets(node.attributes)}];`,
  );
  const edges = graph.edges.map(
    edge =>
      `${edge.left} -> ${edge.right} [${showAttribuets(edge.attributes)}];`,
  );
  return ['digraph {', ...nodes, ...edges, '}'].join('\n');
}

export function from(d: diagram.Diagram): Graph {
  const type = 'digraph';
  const edges = _.chain(d.links)
    .map((link: diagram.Link): Edge => ({
      left: link.left.id,
      right: link.right.id,
      attributes: {},
    }))
    .value();
  const nodes = _.chain(d.children).map(elemToNode).value();

  return { type, nodes, edges };
}

function showAttribuets(attrs: Attributes): string {
  return _.chain(attrs)
    .keys()
    .sort()
    .map(k => {
      const v = attrs[k];
      return typeof v === 'string' ? `${k}="${v}"` : `${k}=${v}`;
    })
    .join(',')
    .value();
}

function elemToNode(elem: diagram.Element): Node {
  return {
    id: elem.id,
    attributes: {
      shape: 'record',
    },
  };
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
  readonly attributes: Attributes;
}

export interface Node {
  readonly id: Id;
  readonly attributes: Attributes;
}

export interface Attributes {
  readonly [key: string]: string | number;
}
