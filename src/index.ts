import * as parser from './parser';

const Kojo = {
  parse(str: string): any {
    return parser.parse(str);
  },
};

export default Kojo;
