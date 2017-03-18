import test from 'ava';
import { diagramMacro } from './helper';

test(diagramMacro, 'caption Hello, world!\n', [{ type: 'caption', value: 'Hello, world!'}]);
test(diagramMacro, 'caption line1\\nline2\n', [{ type: 'caption', value: 'line1\nline2'}]);
