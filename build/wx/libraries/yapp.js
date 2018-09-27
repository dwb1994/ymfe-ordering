'use strit';

const eventNames = ['launch', 'show', 'hide', 'error'];
const noop = () => {};

module.exports = appOpt => {
  eventNames.forEach(name => {
    let en = `on${name.replace(/\w/, a => a.toUpperCase())}`,
        origin = appOpt[en] || noop;
    appOpt[en] = function (param) {
      global.wmp.emit(`app.${name}`, {
        param: param
      });

      const res = origin.call(this, param);

      require('../biz.js').forEach(bizApp => {
        if (bizApp && typeof bizApp[en] === 'function') {
          bizApp[en].call(this, param);
        }
      });

      return res;
    };
  });
  App(appOpt);
};