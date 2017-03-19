import test from 'ava';
import { umlMacro } from './helper';

test(umlMacro, 'title Hello, world!\n', [{ type: 'title', value: 'Hello, world!'}]);
test(umlMacro, 'title line1\\nline2\n', [{ type: 'title', value: 'line1\nline2'}]);
test(umlMacro, `\
title
Hello,
world!
end title
`, [{ type: 'title', value: 'Hello,\nworld!\n'}]);
