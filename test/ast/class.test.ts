import test from 'ava';
import { diagramMacro } from './helper';

test(diagramMacro, '"A" -- "B"', [{ type: 'link' }]);
test(diagramMacro, 'A -- B', [{ type: 'link' }]);
