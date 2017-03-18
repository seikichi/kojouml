import { test } from 'ava';
import { macro } from './helper';

test(macro, '', { type: 'diagram', children: [] });
test(macro, '@startuml\n@enduml', { type: 'diagram', children: [] });
test(macro, '@startuml\n@enduml\n', { type: 'diagram', children: [] });
