const parser: any = require('./arithmetics');

// const g = new Greeter('seikichi')
// console.log(g.greet());

const Kojo = {
  parse(str: string): any {
    return parser.parse(str);
  },
};

export default Kojo;
