import path from 'path';

export default scaffolds => {
  const command = 'build';

  const options = {
    scaffold: {
      position: 1,
      help: 'Scaffold name',
      type: 'string',
      required: true,
      // Allow to enter only one of existing scaffolds
      choices: Object.keys(scaffolds)
    }
  };

  const callback = ({scaffold, ...opts}) => {
    const packageJson = require(path.join(scaffolds[scaffold], 'package.json'));
    const cli = require(path.join(scaffolds[scaffold], packageJson.main));

    return cli(opts);
  };

  const help = 'Build a new package from a Cloverfield scaffold';

  return {command, options, callback, help};
};
