import glob from 'glob';


glob.sync('**/*.js', {realpath: true, cwd: __dirname})
  .forEach(file => console.log(file) || require(file));
