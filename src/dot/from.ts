import * as _ from 'lodash';
import * as diagram from '../diagram';

import {
  Edge,
  Graph,
  Node,
  defaultAttributes,
  defaultEdge,
  defaultNode,
} from './records';

export function from(d: diagram.Diagram): Graph {
  const type = 'digraph';
  const edges = _.chain(d.links).map(convertLink).value();
  const nodes = _.chain(d.children).map(elemToNode).value();

  return { type, nodes, edges };
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
    default:
      const check: never = head;
      return check;
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
    default:
      const check: never = head;
      return check;
  }
}

function convertLink(link: diagram.Link): Edge {
  return {
    ...defaultEdge,
    left: link.left.id,
    right: link.right.id,
    attributes: {
      ...defaultAttributes,
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
    ...defaultNode,
    id: elem.id,
    attributes: {
      ...defaultAttributes,
      shape: 'record',
      label: `{${elem.id}|${fields.join('\\l')}\\l|${methods.join('\\l')}\\l}`,
    },
  };
}
