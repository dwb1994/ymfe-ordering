'use strit';

const register = exports.register = (key, obj) => {
  exports[key] = global[key] = obj;
};

register('YApp', require('./yapp'));
register('YPage', require('./ypage'));
register('regeneratorRuntime', require('./regeneratorRuntime'));
register('wmp', require('./createEventManager')(void 0, true));

exports.wmp.overwrite = (key, fn) => {
  let origin = wx[key];
  Object.defineProperty(wx, key, {
    get: () => fn(origin)
  });
};

global.micrapp = exports.micrapp = exports.wmp;