const data = require('../../utils/source.js');
let arr = [];
data.forEach((item, index) => {
  if (!/特色卤水|游水海鲜|面点主食/.test(item.name)) {
    const itemFoods = item.foods.map(i => {
      return {
        name: i.name,
        price: i.specfoods[0].price,
        image: i.image_path
      };
    });
    arr = arr.concat(itemFoods);
  }
});
require('fs');