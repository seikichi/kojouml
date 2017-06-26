import * as uml from '../src/uml';

it('parse simple caption', () => {
  const actual = uml.parse('caption Hello, world!\n');
  const expected = {type: 'uml', children: [{ type: 'caption', value: 'Hello, world!'}]};
  expect(actual).toEqual(expected);
});
