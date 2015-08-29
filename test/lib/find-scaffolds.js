import test from 'blue-tape';
import {spy} from 'sinon';


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


const mockNpm = () => {
  const npm = {
    load: spy(),
    commands: {
      ls: spy()
    }
  };

  return {npm};
};


test('Find Scaffolds API', assert => {
  const {npm} = mockNpm();

  assert.ok(findGlobal(npm) instanceof Function, 'should be function');
  assert.ok(findGlobal(npm)() instanceof Promise, 'should return Promise');

  assert.end();
});


test('Search for global Scaffolds', assert => {
  const {npm} = mockNpm();

  findGlobal(npm)();
  assert.equal(npm.load.getCall(0).args[0].global, true, 'should call npm.init with global flag');

  assert.end();
});


test('Search for local Scaffolds', assert => {
  const {npm} = mockNpm();

  findLocal(npm)();
  assert.equal(npm.load.getCall(0).args[0].global,
    false,
    'should call npm.init without global flag');

  assert.end();
});


test('Finding Scaffolds', assert => {
  const {npm} = mockNpm();
  const promise = findGlobal(npm)();

  assert.ok(npm.load.calledOnce, 'npm.init should be called');

  // Emulate successful load response
  const loadCallback = npm.load.getCall(0).args[1];

  loadCallback(null);

  assert.ok(npm.commands.ls.calledOnce, 'npm.commands.ls should be called');


  const lsCallback = npm.commands.ls.getCall(0).args[2];

  lsCallback(null, {dependencies});

  return promise
    .then(scaffolds => {
      assert.ok(scaffolds, 'find-scaffold should resolve with found scaffolds');
      assert.deepEqual(Object.keys(scaffolds), ['test', 'tagged1', 'tagged2'],
        'should return correctly matched scaffolds');
    });
});


test('Find Scaffolds fail on npm.init', assert => {
  const {npm} = mockNpm();
  const promise = findGlobal(npm)();
  const loadCallback = npm.load.getCall(0).args[1];


  loadCallback(new Error('Oops'));


  return promise
    .catch(error => {
      assert.ok(error instanceof Error, 'should reject with Error');
      assert.equal(error.message, 'Oops', 'should pass-through error message');
    });
});


test('Find Scaffolds fail on npm.commands.ls', assert => {
  const {npm} = mockNpm();
  const promise = findGlobal(npm)();
  const loadCallback = npm.load.getCall(0).args[1];

  loadCallback(null);


  const lsCallback = npm.commands.ls.getCall(0).args[2];

  lsCallback(new Error('Oops'));

  return promise
    .catch(error => {
      assert.ok(error instanceof Error, 'should reject with Error');
      assert.equal(error.message, 'Oops', 'should pass-through error message');
    });
});
