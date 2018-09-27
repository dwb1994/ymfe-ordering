// require('core-js/fn/array/keys');
// require('core-js/fn/array/values');

var array = ['a', 'b', 'c'];

for (var val of array) console.log(val);          // => 'a', 'b', 'c'
for (var val of array.values()) console.log(val); // => 'a', 'b', 'c'
for (var key of array.keys()) console.log(key);   // => 0, 1, 2
for (var key of array.entries()) console.log(key);   // => 0, 1, 2