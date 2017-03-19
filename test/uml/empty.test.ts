import { test } from 'ava';
import { umlMacro } from './helper';

test(umlMacro, '', []);
test(umlMacro, '@startuml\n@enduml', []);
test(umlMacro, '@startuml\n@enduml\n', []);
