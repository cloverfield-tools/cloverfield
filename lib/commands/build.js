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

  const callback = ({scaffold, ...opts}) =>
    require(scaffolds[scaffold])(opts);

  const help = 'Build a new package from a Cloverfield scaffold';

  return {command, options, callback, help};
};
