
global.YPage('pages/index/index', 0)({
  data: {
    days: days,
    day: 8,
    value: [7],
    showMenu: false,
    menu: [],
    totalPrice: 0,
    average: 0,
    dwbtest: 123
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
  onLoad: function () { },
  bindChange: function (e) {
    const val = e.detail.value;
    this.setData({
      day: this.data.days[val[0]]
    });
  }
});