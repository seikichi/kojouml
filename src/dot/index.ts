import * as _ from 'lodash';
import * as parser from '../parser';
// import * as R from 'ramda';

export function show(_graph: Graph): string {
  return '';
}

function indexNodeId(d: parser.Diagram): { [ident: string]: string } {
  let counter = 0;
  return _.reduce(
    d.children,
    (ids: { [indent: string]: string }, elem: parser.Element) => {
      if (elem.type === 'class') {
        return { ...ids, [elem.name]: `sh${++counter}` };
      }
      return ids;
    },
    {},
  );
}

function process(
  elem: parser.Element,
  graph: Graph,
  ids: { [ident: string]: string },
): Graph {
  switch (elem.type) {
    case 'class':
      graph.nodes.push({
        id: ids[elem.name],
        attributes: { label: elem.name },
      });
      return graph;
    case 'link':
      graph.edges.push({
        lhs: ids[elem.left.node.value],
        rhs: ids[elem.right.node.value],
        attributes: {},
      });
      return graph;
    default:
      return graph;
  }
}

export function fromDiagram(d: parser.Diagram): Graph {
  const diagram = parser.normalize(d);
  const graph: Graph = {
    type: 'digraph',
    id: 'unix',
    attributes: {
      graph: {},
      node: {},
      edge: {},
    },
    nodes: [],
    edges: [],
  };
  const ids = indexNodeId(diagram);
  return _.reduce(
    diagram.children,
    (graph, elem) => {
      return process(elem, graph, ids);
    },
    graph,
  );
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
