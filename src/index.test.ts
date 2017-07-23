import Kojo from '.';

const tests: [string, string][] = [['simple uml', 'A -- B']];

tests.forEach(([name, source]) => {
  test(name, () => expect(Kojo.generateSvg(source)).toBeTruthy());
});
