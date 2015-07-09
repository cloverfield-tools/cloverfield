#! /usr/bin/env ./node_modules/.bin/babel-node


import cloverfield from './lib/cloverfield';


// Check if script is run directly
if (require.main === module) {
  cloverfield();
}


export default cloverfield;
