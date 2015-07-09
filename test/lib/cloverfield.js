import test from 'blue-tape';


import cloverfield from '../../lib/cloverfield';


test('Cloverfield CLI', (assert) => new Promise((resolve) => {
  assert.ok(cloverfield);

  resolve();
}));


