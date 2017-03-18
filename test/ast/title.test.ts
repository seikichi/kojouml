import test from 'ava';
import { macro } from './helper';

test(macro, 'title Hello, world!\n', {
  type: 'diagram', children: [{ type: 'title', value: 'Hello, world!'}],
});

test(macro, 'title line1\\nline2\n', {
  type: 'diagram', children: [{ type: 'title', value: 'line1\nline2'}],
});

test(macro, `\
title
Hello,
world!
end title
`, {
  type: 'diagram', children: [{ type: 'title', value: 'Hello,\nworld!\n'}],
});
