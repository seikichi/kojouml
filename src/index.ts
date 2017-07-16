import * as diagram from './diagram';
import * as dot from './dot';
import * as parser from './parser';
const Viz: (source: string) => string = require('viz.js');

const Kojo = {
  genarateSvg(str: string): string {
    return Viz(dot.show(dot.from(diagram.from(parser.parse(str)))));
  },
};

export default Kojo;
