import test from 'ava';
import { umlMacro } from './helper';

test(umlMacro, 'caption Hello, world!\n', [{ type: 'caption', value: 'Hello, world!'}]);
test(umlMacro, 'caption line1\\nline2\n', [{ type: 'caption', value: 'line1\nline2'}]);
