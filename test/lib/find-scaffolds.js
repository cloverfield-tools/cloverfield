import test from 'blue-tape';


import findScaffolds from '../../lib/find-scaffolds';


test('Find Scaffolds', (assert) => new Promise((resolve) => {
  assert.ok(findScaffolds);

  resolve();
}));

