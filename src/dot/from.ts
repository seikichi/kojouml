import * as _ from 'lodash';

import * as diagram from '../diagram';
import {
  Attributes,
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
  const nodes = _.chain(d.children).map(convertElem).value();
  const attributes: { graph: Attributes } = {
    graph: {
      type: 'attributes',
      nodesep: 0.486111,
      ranksep: 0.833333,
      remincross: true,
    },
  };

  return { type, attributes, nodes, edges };
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
      color: '#A80036',
    },
  };
}

function monospaceWidth(s: string, fontsize: number, inches: number): number {
  const matches = s.match(/[\x00-\x7F]/g);
  const half = matches ? matches.length : 0;
  const full = s.length - half;

  return full * fontsize / inches + half * 0.6 * fontsize / inches;
}

function convertElem(elem: diagram.Element): Node {
  const inches = 72.0;
  const fontsize = 14.0;

  const methods = elem.methods.map(e => e.name);
  const fields = elem.fields.map(f => f.name);

  const widthList = [
    monospaceWidth(elem.id, fontsize, inches),
    ...elem.fields.map(f => monospaceWidth(f.name, fontsize, inches)),
    ...elem.methods.map(m => monospaceWidth(m.name, fontsize, inches)),
  ];

  const [xmargin, ymargin] = [0.11, 0.055];
  const rows = 1 + Math.max(methods.length, 1) + Math.max(fields.length, 1);
  const width = _.max(widthList)! + 2 * xmargin;
  const height = fontsize * rows / inches + (rows + 1) * ymargin;

  return {
    ...defaultNode,
    id: elem.id,
    attributes: {
      ...defaultAttributes,
      shape: 'record',
      fontname: 'monospace',
      fixedsize: true,
      width,
      height,
      label: `{${elem.id}|${fields.join('\\l')}\\l|${methods.join('\\l')}\\l}`,
      style: 'filled',
      fillcolor: '#FEFECE',
      color: '#A80036',
    },
  };
}
