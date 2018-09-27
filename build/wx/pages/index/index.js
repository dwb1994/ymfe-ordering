function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//index.js
//获取应用实例
// const app = getApp()
const data = require('../../utils/data.js');

// console.log(data);
let AllFoods = [];
data.forEach((item, index) => {
  if (!/特色卤水|游水海鲜|面点主食/.test(item.name)) {
    let cheapFoods = [];
    const itemFoods = item.foods.forEach(i => {
      const price = i.specfoods[0].price;
      if (price <= 48) {
        cheapFoods.push({
          name: i.name,
          price: i.specfoods[0].price,
          image: i.image_path,
          stock: i.specfoods[0].stock
        });
      }
    });
    AllFoods = AllFoods.concat(cheapFoods);
  }
});

let menu = [];
let menuIndexs = [];
let totalPrice = 0;

const getFoodNumber = number => {
  return Math.floor(number * 0.75);
};

const days = [];

for (let i = 1; i <= 16; i++) {
  days.push(i);
}

// console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize());

// include ...
// var ifInclude = [1, 2, 3].includes(1);
// var res = '123';
// if (ifInclude) {
//   res = 'true!';
// } else {
//   res = 'false!';
// }


// var array = ['a', 'b', 'c'];
// console.log(array.keys);
// console.log(array.entries);
// console.log(array.values);
// console.log([1, 2, 3].values());
// for (var val of array) console.log(val);          // => 'a', 'b', 'c'
// for (var val of [1,2,3].values()) console.log(val); // => 'a', 'b', 'c'
// for (var key of array.keys()) console.log(key);   // => 0, 1, 2


var res = 'defatult';

global.YPage('pages/index/index', 0)({

  data: {
    days: days,
    day: 8,
    value: [7],
    showMenu: false,
    menu: [],
    totalPrice: 0,
    average: 0,
    dwbtest: res
  },
  getValue: function (number) {
    for (let i = 0; i < number; i++) {
      const randomIndex = Math.floor(Math.random() * AllFoods.length);
      const dishes = AllFoods[randomIndex];
      this.data.totalPrice += dishes.price;
      // 避免重复;
      if (!menuIndexs.includes(randomIndex)) {
        menu.push(dishes);
        menuIndexs.push(randomIndex);
      }
    }
    if (this.data.totalPrice / this.data.day < 32 && this.data.totalPrice / this.data.day > 28.5 && menuIndexs.length === number) {
      return menu;
    } else {
      menu = [];
      menuIndexs = [];
      this.setData({
        totalPrice: 0
      });
      this.getValue(number);
    }
    return menu;
  },
  //事件处理函数
  buildMenu: function () {
    this.setData({
      showMenu: true,
      menu: this.getValue(getFoodNumber(this.data.day)),
      average: (this.data.totalPrice / this.data.day).toFixed(2)
    });
  },
  onLoad: function () {
    var res = '123';
    this.setData({
      dwbtest: res
    });
    const bar123 = setTimeout(() => {
      console.log('async bar');
      res = 'ok!';
      this.setData({
        dwbtest: res
      });
    }, 3000);
    const asyncFoo = (() => {
      var _ref = _asyncToGenerator( /*#__PURE__*/global.regeneratorRuntime.mark(function _callee() {
        return global.regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return bar123();

            case 2:
            case 'end':
              return _context.stop();
          }
        }, _callee, this);
      }));

      function foo123() {
        return _ref.apply(this, arguments);
      }

      return foo123;
    })();
    console.log(asyncFoo);
  },
  bindChange: function (e) {
    const val = e.detail.value;
    this.setData({
      day: this.data.days[val[0]]
    });
  }
});