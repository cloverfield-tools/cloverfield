const cloverfield = parser => commands => {
  commands.forEach(({command, options, callback, help}) =>
    parser
      .command(command)
      .options(options)
      .callback(callback)
      .help(help));


  parser.script('cf');
};


export default cloverfield;
