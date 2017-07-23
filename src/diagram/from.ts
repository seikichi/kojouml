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

interface WithIndex { index: number }

export function from(d: parser.Diagram): Diagram {
  const type = 'class_diagram';
  const expanded = _.chain(d.children).flatMap(expand);

  const children = _.chain(expanded)
    .filter(parser.isClass)
    .map(convertClass)
    .map((elem, index) => ({ ...elem, index }))
    .groupBy('name')
    .mapValues(mergeElemAndIds)
    .toArray()
    .sortBy('index')
    .map(({ index: _, ...elem }) => elem as Class)
    .value();

  const links = _.chain(expanded)
    .filter(parser.isLink)
    .map(convertLink)
    .value();

  return { type, children, links };
}

function mergeElemAndIds(vs: Array<Element & WithIndex>): Element & WithIndex {
  return _.reduce(vs, mergeClassWithIndex)!;
}

function mergeClassWithIndex(
  left: Class & WithIndex,
  right: Class & WithIndex,
): Class & WithIndex {
  return {
    ...defaultClass,
    id: right.id || left.id,
    name: right.name || left.name,
    methods: _.uniqBy([...right.methods, ...left.methods], 'name'),
    fields: _.uniqBy([...right.fields, ...left.fields], 'name'),
    index: Math.min(left.index, right.index),
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

function convertClass(klass: parser.Class): Class {
  return {
    ...defaultClass,
    id: klass.name,
    name: klass.name,
    methods: klass.methods,
    fields: klass.fields,
  };
}

function expand(elem: parser.Element): parser.Element[] {
  switch (elem.type) {
    case 'class':
      const parents: parser.Class[] = elem.parents.map(p => ({
        ...parser.defaultClass,
        name: p,
      }));
      const extendsLinks = elem.parents.map((i): parser.Link => ({
        type: 'link',
        left: {
          node: {
            type: 'ident',
            value: i,
          },
          head: '<|',
        },
        right: {
          node: {
            type: 'ident',
            value: elem.name,
          },
        },
        line: {
          char: '-',
          length: 2,
        },
      }));

      const interfaces: parser.Class[] = elem.interfaces.map(i => ({
        ...parser.defaultClass,
        name: i,
      }));

      const implementLinks = elem.interfaces.map((i): parser.Link => ({
        type: 'link',
        left: {
          node: {
            type: 'ident',
            value: i,
          },
          head: '<|',
        },
        right: {
          node: {
            type: 'ident',
            value: elem.name,
          },
        },
        line: {
          char: '.',
          length: 2,
        },
      }));

      return [
        ...parents,
        ...extendsLinks,
        ...interfaces,
        ...implementLinks,
        elem,
      ];
    case 'link':
      const left = elem.left.node.value;
      const right = elem.right.node.value;
      return [
        {
          ...parser.defaultClass,
          name: left,
        },
        {
          ...parser.defaultClass,
          name: right,
        },
        elem,
      ];
    default:
      return [];
  }
}
