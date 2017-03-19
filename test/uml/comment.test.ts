import test from 'ava';
import { umlMacro } from './helper';

test(umlMacro, "' comment", [{ type: 'comment', value: 'comment'}]);
test(umlMacro, "  '   comment", [{ type: 'comment', value: 'comment'}]);
test(umlMacro, `
/'
Hello, world!
Hello, world!
'/
`, [{ type: 'comment', value: '\nHello, world!\nHello, world!\n'}]);
