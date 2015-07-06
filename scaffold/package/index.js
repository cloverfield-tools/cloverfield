#! /usr/bin/env ./node_modules/.bin/babel-node


import prompt from 'prompt';
import {parse} from 'nomnom';


const schema = {
  properties: {
    name: {
      description: 'Package name: ',
      pattern: /^[a-z]+[a-z\-_]+$/,
      message: 'Name must be only letters, numbers, dashes and underscores',
      required: true
    }
  }
};

prompt.message = '>'.green;
prompt.delimiter = ' ';
prompt.colors = false;
prompt.start();


const scaffold = () => {
  prompt.get(schema, (err, {name}) =>
    console.log(`Scaffolding ${name}...`));
};


// Check if script is run directly
if (require.main === module) {
  scaffold(parse());
}


export default scaffold;
