import * as _ from 'lodash';

import { Attributes, Edge, Graph, Node } from './records';

export function show(target: Graph | Node | Edge | Attributes): string {
  switch (target.type) {
    case 'digraph':
      return showGraph(target);
    case 'edge':
      return showEdge(target);
    case 'node':
      return showNode(target);
    case 'attributes':
      return showAttributes(target);
    default:
      const check: never = target;
      return check;
  }
}

function showGraph(graph: Graph): string {
  const nodes = graph.nodes.map(show);
  const edges = graph.edges.map(show);
  return ['digraph {', ...nodes, ...edges, '}'].join('\n');
}

function showNode({ id, attributes }: Node): string {
  return `${id} [${show(attributes)}];`;
}

function showEdge({ left, right, attributes }: Edge): string {
  return `${left} -> ${right} [${show(attributes)}];`;
}

function showAttributes(attrs: Attributes): string {
  const showPair = (k: string) => {
    const v = attrs[k];
    return typeof v === 'string' ? `${k}="${v}"` : `${k}=${v}`;
  };

  return _.chain(attrs)
    .keys()
    .sort()
    .filter(k => k !== 'type')
    .map(showPair)
    .join(' ')
    .value();
}
