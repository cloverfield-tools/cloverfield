import test from 'blue-tape';
import npm from 'npm';
import {stub, spy} from 'sinon';


import findScaffolds from '../../lib/find-scaffolds';


const dependencies = {
  test: {
    // should skip this one
    name: 'whatever-random-name',
    realPath: 'test realpath'
    // no keywords, should not fail
  },
  prefixedName: {
    // should return, because it matches name = 'cf-*'
    name: 'cf-test',
    realPath: 'prefixed realpath',
    keywords: ['random', 'keywords']
  },
  taggedWithSingleTag: {
    // should return, because it matches tag 'cloverfield-scaffold'
    name: 'tagged1',
    realPath: 'tagged1 realpath',
    keywords: ['cloverfield-scaffold']
  },
  taggedWithTwoTags: {
    // should return, because it matches two tags 'cloverfield' && 'scaffold'
    name: 'tagged2',
    realPath: 'tagged2 realpath',
    keywords: ['cloverfield', 'scaffold']
  },
  incorrectlyTagged: {
    // should skip this because it matches only one tag 'cloverfield', but not 'scaffold'
    name: 'incorrectly-tagged',
    realPath: 'incorrectly-tagged realpath',
    keywords: ['cloverfield', 'something else']
  }
};


const before = () => {
  // Stubs
  const load = spy();

  stub(npm, 'load', load);
  npm.commands = {
    ls: spy()
  };

  return {load};
};


const after = () => {
  npm.load.restore();
};


test('Find Scaffolds success', assert => {

  const {load} = before();

  assert.ok(findScaffolds instanceof Function, 'should be function');


  const promise = findScaffolds();

  assert.ok(promise instanceof Promise, 'should return Promise');


  assert.ok(load.calledOnce, 'npm.init should be called');


  // Emulate successfull load response
  const loadCallback = load.getCall(0).args[1];

  loadCallback(null);

  assert.ok(npm.commands.ls.calledOnce, 'npm.commands.ls should be called');


  const lsCallback = npm.commands.ls.getCall(0).args[2];

  lsCallback(null, {dependencies});

  return promise
    .then(scaffolds => {
      assert.ok(scaffolds, 'find-scaffold should resolve with found scaffolds');
      assert.deepEqual(Object.keys(scaffolds), ['test', 'tagged1', 'tagged2'],
        'should return correctly matched scaffolds');
    })
    .then(after);
});


test('Find Scaffolds fail on npm.init', assert => {
  const {load} = before();
  const promise = findScaffolds();
  const loadCallback = load.getCall(0).args[1];


  loadCallback(new Error('Oops'));


  return promise
    .catch(error => {
      assert.ok(error instanceof Error, 'should reject with Error');
      assert.equal(error.message, 'Oops', 'should pass-through error message');
    })
    .then(after);
});


test('Find Scaffolds fail on npm.commands.ls', assert => {
  const {load} = before();
  const promise = findScaffolds();
  const loadCallback = load.getCall(0).args[1];

  loadCallback(null);


  const lsCallback = npm.commands.ls.getCall(0).args[2];

  lsCallback(new Error('Oops'));

  return promise
    .catch(error => {
      assert.ok(error instanceof Error, 'should reject with Error');
      assert.equal(error.message, 'Oops', 'should pass-through error message');
    })
    .then(after);
});
