#! /usr/bin/env ./node_modules/.bin/babel-node


import nomnom from 'nomnom';
import cloverfield from './lib/cloverfield';
import findScaffolds from './lib/find-scaffolds';
import buildCommand from './lib/commands/build';


const parser = nomnom();


Promise.all([
  findScaffolds()
    .catch(console.error.bind(console))
    .then(buildCommand)
])
  .then(cloverfield(parser))
  .then(() => parser.parse());
