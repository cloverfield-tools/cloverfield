import test from 'blue-tape';
import npm from 'npm';
import {stub, spy} from 'sinon';


import {findLocal, findGlobal} from '../../lib/find-scaffolds';


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
  },
  packageWithoutName: {
    // should skip this because it does not have a name
    realPath: 'package-without-name realpath',
    keywords: ['cloverfield', 'scaffold']
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


test('Find Scaffolds API', assert => {
  before();


  assert.ok(findGlobal instanceof Function, 'should be function');
  assert.ok(findGlobal() instanceof Promise, 'should return Promise');


  after();
  assert.end();
});


test('Search for global Scaffolds', assert => {
  const {load} = before();


  findGlobal();
  assert.equal(load.getCall(0).args[0].global, true, 'should call npm.init with global flag');


  after();
  assert.end();
});


test('Search for local Scaffolds', assert => {
  const {load} = before();


  findLocal();
  assert.equal(load.getCall(0).args[0].global, false, 'should call npm.init without global flag');


  after();
  assert.end();
});


test('Finding Scaffolds', assert => {
  const {load} = before();
  const promise = findGlobal();

  assert.ok(load.calledOnce, 'npm.init should be called');

  // Emulate successful load response
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
  const promise = findGlobal();
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
  const promise = findGlobal();
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
