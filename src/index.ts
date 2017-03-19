import * as uml from './uml';

const Kojo = {
  parse(str: string): any {
    return uml.parse(str);
  },
};

export default Kojo;
