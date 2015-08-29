const isScaffold = ({keywords = [], name}) => name && (
  name.substr(0, 3) === 'cf-' ||
  keywords.indexOf('cloverfield-scaffold') !== -1 ||
  keywords.indexOf('cloverfield') !== -1 && keywords.indexOf('scaffold') !== -1
);


const modulesReady = (resolve, reject) => (error, tree) => {
  if (error) {
    return reject(error);
  }

  const deps = tree.dependencies;
  const scaffolds = Object.keys(deps)
    .reduce((result, key) =>
      // Search only for Cloverfield Scaffolds
      Object.assign(result, isScaffold(deps[key]) ?
        {[deps[key].name.replace(/^cf-/, '')]: deps[key].realPath} : {}), {});

  resolve(scaffolds);
};


const loaded = npm => (resolve, reject) => (error) => {
  if (error) {
    return reject(error);
  }

  // List all npm dependencies
  return npm.commands.ls([], true, modulesReady(resolve, reject));
};


// TODO: add caching
const findScaffolds = npm => global => () =>
  // Configure npm to search for dependencies globally or locally with minimal depth
  new Promise((...args) => npm.load({global, silent: true, depth: 0}, loaded(npm)(...args)));


export const findLocal = npm => findScaffolds(npm)(false);


export const findGlobal = npm => findScaffolds(npm)(true);
