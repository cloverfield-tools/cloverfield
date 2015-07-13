import test from 'blue-tape';


import build from '../../../lib/commands/build';


test('Build Command', assert => {
  assert.ok(build instanceof Function, 'should be function');


  assert.deepEqual(Object.keys(build({})),
    ['command', 'options', 'callback', 'help'],
    'should return data for command');


  const {options: {scaffold: {choices}}} = build({test: '', test2: ''});

  assert.deepEqual(choices,
    ['test', 'test2'],
    'should use provided scaffolds to limit available scaffold choices');


  const {callback} = build({test: 'does.not.exist'});

  assert.throws(() => callback({scaffold: 'test'}),
    'should require module "does.not.exist" and throw');

  assert.end();
});
