import test from 'ava';
import { diagramMacro } from './helper';

test(diagramMacro, 'title Hello, world!\n', [{ type: 'title', value: 'Hello, world!'}]);
test(diagramMacro, 'title line1\\nline2\n', [{ type: 'title', value: 'line1\nline2'}]);
test(diagramMacro, `\
title
Hello,
world!
end title
`, [{ type: 'title', value: 'Hello,\nworld!\n'}]);
