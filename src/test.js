'use strict';

// In your project you should replace './opencc' with 'opencc'
var OpenCC = require('opencc');

// Load the default Simplified to Traditional config
var opencc = new OpenCC('s2hk.json');

// Sync API
//var converted = opencc.convertSync("汉字");
var converted = opencc.convertSync("hello hello");
console.log(converted);

// Async API
opencc.convert("汉字", function (err, converted) {
  console.log(converted);
});
