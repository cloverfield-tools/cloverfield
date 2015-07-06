import npm from 'npm';


const isScaffold = ({keywords = [], name}) =>
  name.substr(0, 2) === 'cf-' ||
  keywords.indexOf('cloverfield-scaffold') !== -1 ||
  keywords.indexOf('cloverfield') !== -1 && keywords.indexOf('scaffold') !== -1;


const modulesReady = (resolve, reject) => (error, tree) => {
  if (error) {
    return reject(error);
  }

  const deps = tree.dependencies;
  const scaffolds = Object.keys(deps)
    .reduce((result, dep) =>
      // Search only for Cloverfield Scaffolds
      Object.assign(result, isScaffold(deps[dep]) ?
        {[dep.replace(/^cf-/, '')]: deps[dep].realPath} : {}), {});

  resolve(scaffolds);
};


const loaded = (resolve, reject) => (error) => {
  if (error) {
    return reject(error);
  }

  // List all npm dependencies
  return npm.commands.ls([], true, modulesReady(resolve, reject));
};


// TODO: add caching
const findScaffolds = () =>
  // Configure npm to search for dependencies globally with minimal depth
  new Promise((...args) => npm.load({global: true, silent: true, depth: 0}, loaded(...args)));


export default findScaffolds;
