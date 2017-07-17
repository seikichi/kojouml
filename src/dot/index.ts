import * as _ from 'lodash';
import * as diagram from '../diagram';

export function show(graph: Graph): string {
  const nodes = graph.nodes.map(showNode);
  const edges = graph.edges.map(showEdge);
  return ['digraph {', ...nodes, ...edges, '}'].join('\n');
}

export function from(d: diagram.Diagram): Graph {
  const type = 'digraph';
  const edges = _.chain(d.links).map(convertLink).value();
  const nodes = _.chain(d.children).map(elemToNode).value();

  return { type, nodes, edges };
}

function showNode(node: Node): string {
  return `${node.id} [${showAttribuets(node.attributes)}];`;
}

function showEdge(edge: Edge): string {
  const { left, right, attributes } = edge;
  return `${left} -> ${right} [${showAttribuets(attributes)}];`;
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

function convertLinkLeftHead(head?: diagram.LinkLeftHead): string {
  if (!head) {
    return 'none';
  }
  switch (head) {
    case '<|':
      return 'onormal';
    case '<':
      return 'vee';
    case '^':
      return 'onormal';
    case '+':
      return 'odot';
    case 'o':
      return 'odiamond';
    case 'x':
      return 'crowvee';
    case '*':
      return 'diamond';
    case '#':
      return 'obox';
  }
}

function convertLinkRightHead(head?: diagram.LinkRightHead): string {
  if (!head) {
    return 'none';
  }
  switch (head) {
    case '|>':
      return 'onormal';
    case '>':
      return 'vee';
    case '^':
      return 'onormal';
    case '+':
      return 'odot'; // TODO
    case 'o':
      return 'odiamond';
    case 'x':
      return 'crowvee'; // TODO
    case '*':
      return 'diamond';
    case '#':
      return 'obox';
  }
}

function convertLink(link: diagram.Link): Edge {
  return {
    left: link.left.id,
    right: link.right.id,
    attributes: {
      dir: 'both',
      arrowtail: convertLinkLeftHead(link.left.head),
      arrowhead: convertLinkRightHead(link.right.head),
      style: link.line.char === '.' ? 'dashed' : 'solid',
      label: link.label || '',
      taillabel: link.left.cardinality || '',
      headlabel: link.right.cardinality || '',
      minlen: link.line.length,
    },
  };
}

function elemToNode(elem: diagram.Element): Node {
  const methods = elem.methods.map(e => e.name);
  const fields = elem.fields.map(f => f.name);
  return {
    id: elem.id,
    attributes: {
      shape: 'record',
      label: `{${elem.id}|${fields.join('\\l')}|${methods.join('\\l')}}`,
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
