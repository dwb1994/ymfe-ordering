const core = require('./polyfill.js')
require('../node_modules/core-js/fn/array/keys');
require('../node_modules/core-js/fn/array/values');

console.info(core)


function noneMethod(obj, method, isStatic = true) {
  if (isStatic) {
    return !obj[method]
  } else {
    return !obj.prototype[method]
  }
}


['Array'].forEach((item) => {
  let obj = core[item]
  let virtual = obj.virtual || {}


  for (let i in obj) {
    if (i === 'virtual') continue

    if (virtual.hasOwnProperty(i)) {
      switch (item) {
        case 'Array':
          if (noneMethod(Array, i, false)) {
            Array.prototype[i] = ['keys', 'values', 'entries'].indexOf(i) === -1 ? virtual[i] : obj[i]
          }
          break
      }
    } else {
      switch (item) {
        case 'Array':
          if (noneMethod(Array, i)) {
            Array[i] = obj[i]
          }
          break
      }
    }
  }
})


module.exports = core