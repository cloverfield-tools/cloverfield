#! /usr/bin/env node


import 'babel/polyfill';
import nomnom from 'nomnom';
import cloverfield from './cloverfield';
import findScaffolds from './find-scaffolds';
import buildCommand from './commands/build';


const parser = nomnom();


Promise.all([
  findScaffolds()
    .catch(console.error.bind(console))
    .then(buildCommand)
])
  .then(cloverfield(parser))
  .then(() => parser.parse());
