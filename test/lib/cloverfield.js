import test from 'blue-tape';
import {spy} from 'sinon';
import nomnom from 'nomnom';


import cloverfield from '../../lib/cloverfield';


const commands = [
  {
    command: 'build',
    options: {
      scaffold: {
        position: 1,
        choices: ['package']
      }
    },
    callback: spy(),
    help: 'Test command'
  }
];


const before = () => {
  const parser = nomnom();
  const printer = spy();

  parser.printer(printer);
  return {parser, printer};
};


const after = ({printer}) => {
  commands[0].callback.reset();
  printer.reset();
};


test('Cloverfield', assert => {
  assert.ok(cloverfield instanceof Function, 'should be function');
  assert.end();
});


test('Incorrect command', assert => {
  const {parser, printer} = before();

  cloverfield(parser)(commands);

  parser.parse(['unknownCommand']);
  assert.ok(printer.calledWithMatch('cf:'), 'should set script name to cf');
  assert.ok(printer.calledWithMatch('no such command'),
    'should show error if unknown command passed');

  after({printer});
  assert.end();
});


test('Wrong option provided', assert => {
  const {parser, printer} = before();


  cloverfield(parser)(commands);

  parser.parse(['build', 'test']);
  assert.ok(printer.calledWithMatch('scaffold must be one of'),
    'should show error for wrong option');

  after({printer});
  assert.end();
});


test('Correct option', assert => {
  const {parser, printer} = before();

  cloverfield(parser)(commands);

  parser.parse(['build', 'package']);
  assert.ok(commands[0].callback.calledOnce, 'should call provided callback');

  after({printer});
  assert.end();
});


