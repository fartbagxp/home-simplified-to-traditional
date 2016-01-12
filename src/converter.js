'use strict';

var fs = require('fs');
var OpenCC = require('opencc');

// Load the default Simplified to Traditional HK config
var opencc = new OpenCC('s2hk.json');

var converter = {};

/**
 *  This function converts the input file (in utf-8) and all the simplified
 *  chinese text in there to traditional chinese.
 *
 * @param  {[String]}   inputFile The input file in utf-8 form.
 * @param  {[String]}   outputFile The output file with all the traditional text
 */
converter.convert = function (inputFile, outputFile) {
  var options = {
    encoding: 'utf8'
  };

  // The subtitle files tend to be pretty small.
  var data = fs.readFileSync(inputFile, options);

  var converted = opencc.convertSync(data);

  fs.writeFileSync(outputFile, converted, options);
};


module.exports = converter;
