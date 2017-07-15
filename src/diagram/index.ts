import * as parser from '../parser';
import * as _ from 'lodash';

export function from(d: parser.Diagram): Diagram {
  const type = 'class_diagram';
  const children = _.chain(d.children)
    .flatMap(expand)
    .map((elem, index): [Element, number] => [elem, index])
    .groupBy(([elem, _]) => elem.id)
    .mapValues(mergeElemAndIds)
    .toArray()
    .sortBy(([_, index]: [Element, number]) => index)
    .map(([elem, _]: [Element, number]) => elem)
    .value();

  const links = _.chain(d.children)
    .filter((e: parser.Element) => e.type === 'link')
    .map(convertLink)
    .value();

  return { type, children, links };
}

function mergeElemAndIds(vs: [Element, number][]): [Element, number] {
  return [
    _.chain(vs)
      .map(vs => vs[0])
      .reduce((ret: Element, elem) => Object.assign({}, ret, elem))
      .value(),
    _.min(_.map(vs, v => v[1])) as number,
  ];
}

function convertLink(e: parser.Link): Link {
  return {
    type: 'link',
    left: { id: e.left.node.value },
    right: { id: e.right.node.value },
  };
}

function expand(elem: parser.Element): Element[] {
  switch (elem.type) {
    case 'link':
      const left = elem.left.node.value;
      const right = elem.right.node.value;
      return [
        { type: 'class', id: left, name: left },
        { type: 'class', id: right, name: right },
      ];
    default:
      return [];
  }
}

export type Diagram = ClassDiagram;
export type Id = string;

export interface ClassDiagram {
  type: 'class_diagram';
  readonly children: ReadonlyArray<Element>;
  readonly links: ReadonlyArray<Link>;
}

export interface Class {
  readonly type: 'class';
  readonly id: Id;
  readonly name: string;
}

export interface Link {
  readonly type: 'link';
  readonly left: {
    readonly id: Id;
    readonly cardinality?: string;
    readonly head?: '<|' | '<' | '^' | '+' | 'o' | 'x' | '*' | '#';
  };
  readonly right: {
    readonly id: Id;
    readonly cardinality?: string;
    readonly head?: '|>' | '>' | '^' | '+' | 'o' | 'x' | '*' | '#';
  };
}

export type Element = Class;
