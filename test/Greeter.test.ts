import test from 'ava';
import Greeter from '../src/Greeter';

test(t => {
  const g = new Greeter('seikichi');
  t.is(g.greet(), 'Hello, seikichi');
});
