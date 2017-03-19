import test from 'ava';
import { diagramMacro } from './helper';

test(diagramMacro, "' comment", [{ type: 'comment', value: 'comment'}]);
test(diagramMacro, "  '   comment", [{ type: 'comment', value: 'comment'}]);
test(diagramMacro, `
/'
Hello, world!
Hello, world!
'/
`, [{ type: 'comment', value: '\nHello, world!\nHello, world!\n'}]);
