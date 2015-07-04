#! /usr/bin/env ./node_modules/.bin/babel-node


import nomnom from 'nomnom';
import glob from 'glob';
import path from 'path';


// Find all available scaffolds
const scaffolds = {};
glob.sync('scaffold/*/', {realpath: true})
  .forEach(pkg => scaffolds[path.basename(pkg)] = pkg);


// `cf build <scaffold>` command
nomnom.command('build')
  .option('scaffold', {
    position: 1,
    help: 'Scaffold name',
    type: 'string',
    required: true,
    // Allow to enter only one of existing scaffolds
    choices: Object.keys(scaffolds)
  })
  .callback(({scaffold, ...opts}) =>
    require(scaffolds[scaffold])(opts))
  .help('Build a new package from a Cloverfield scaffold');


// Set default script name to `cf` for interactive help
nomnom.script('cf');


// Parse input
nomnom.nom();
