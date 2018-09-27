'use strit';

const eventNames = ['load', 'ready', 'show', 'hide', 'unload'];
const eventFnNames = eventNames.map(name => `on${name.replace(/\w/, a => a.toUpperCase())}`);
const isFunction = t => typeof t === 'function';
const isArray = t => Array.isArray(t);
const makeArray = t => Array.prototype.slice.call(t);

module.exports = (pageName, index) => {
  return pageOpt => {
    Object.keys(pageOpt).forEach(key => {
      if (isFunction(pageOpt[key])) {
        let origin = pageOpt[key];
        if (eventFnNames.indexOf(key) > -1) {
          let name = eventNames[eventFnNames.indexOf(key)];
          pageOpt[key] = function (param) {
            global.wmp.emit(`page.${name}`, {
              name: pageName,
              param: param
            });
            return origin.call(this, param);
          };
        } else {
          pageOpt[key] = function () {
            if (arguments.length === 1) {
              let e = arguments[0];
              if (e && isArray(e.touches) && isArray(e.changedTouches)) {
                global.wmp.emit(e.type, {
                  page: pageName,
                  bind: key,
                  event: e
                });
              }
            }
            return origin.apply(this, makeArray(arguments));
          };
        }
        eventNames.forEach((name, index) => {
          const en = eventFnNames[index];
          if (!pageOpt[en]) {
            pageOpt[en] = function (param) {
              global.wmp.emit(`page.${name}`, {
                name: pageName,
                param: param
              });
            };
          }
        });
      }
    });
    if (global.__packed__) {
      global['p' + index] = () => {
        Page(pageOpt || {});
      };
    } else {
      Page(pageOpt || {});
    }
  };
};