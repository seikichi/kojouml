import * as _ from 'lodash';
import * as parser from '../parser';

import {
  Class,
  Diagram,
  Element,
  Link,
  defaultClass,
  defaultLink,
} from './records';

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

function mergeElemAndIds(vs: Array<[Element, number]>): [Element, number] {
  return [
    _.chain(vs).map(v => v[0]).reduce(mergeClass).value(),
    _.min(_.map(vs, v => v[1])) as number,
  ];
}

function mergeClass(left: Class, right: Class): Class {
  return {
    ...defaultClass,
    id: right.id || left.id,
    name: right.name || left.name,
    methods: _.uniqBy([...right.methods, ...left.methods], 'name'),
    fields: _.uniqBy([...right.fields, ...left.fields], 'name'),
  };
}

function convertLink(e: parser.Link): Link {
  return {
    ...defaultLink,
    left: {
      id: e.left.node.value,
      head: e.left.head,
      cardinality: e.left.cardinality,
    },
    right: {
      id: e.right.node.value,
      head: e.right.head,
      cardinality: e.right.cardinality,
    },
    line: {
      char: e.line.char,
      length: e.line.length,
    },
    label: e.label,
  };
}

function expand(elem: parser.Element): Element[] {
  switch (elem.type) {
    case 'class':
      return [
        {
          ...defaultClass,
          id: elem.name,
          name: elem.name,
          methods: elem.methods,
          fields: elem.fields,
        },
      ];
    case 'link':
      const left = elem.left.node.value;
      const right = elem.right.node.value;
      return [
        { ...defaultClass, id: left, name: left },
        { ...defaultClass, id: right, name: right },
      ];
    default:
      return [];
  }
}
