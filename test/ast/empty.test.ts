import { test } from 'ava';
import { diagramMacro } from './helper';

test(diagramMacro, '', []);
test(diagramMacro, '@startuml\n@enduml', []);
test(diagramMacro, '@startuml\n@enduml\n', []);
