import test from 'ava';
import { macro } from './helper';

test(macro, 'caption Hello, world!\n', {
  type: 'diagram', children: [{ type: 'caption', value: 'Hello, world!'}],
});

test(macro, 'caption line1\\nline2\n', {
  type: 'diagram', children: [{ type: 'caption', value: 'line1\nline2'}],
});
