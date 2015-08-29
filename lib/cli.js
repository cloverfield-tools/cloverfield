#! /usr/bin/env node


import 'babel/polyfill';
import nomnom from 'nomnom';
import cloverfield from './cloverfield';
import {findGlobal, findLocal} from './find-scaffolds';
import buildCommand from './commands/build';
import npm from 'npm';


const parser = nomnom();


Promise.all([
  Promise.all([findLocal(npm)(), findGlobal(npm)()])
    .catch(console.error.bind(console))
    // Prefer local packages over global
    .then(([local, global]) => ({...global, ...local}))
    .then(buildCommand)
])
  .then(cloverfield(parser))
  .then(() => parser.parse());
