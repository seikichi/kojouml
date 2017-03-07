import * as AST from './ast';

const Kojo = {
  parse(str: string): any {
    return AST.parse(str);
  },
};

export default Kojo;
