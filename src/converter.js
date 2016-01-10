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
 * @param  {Function}   cb(err) This callback is called when the file is read in.
 *                              An error is sent if error occurred parsing
 *                              the file.
 */
converter.convert = function (inputFile, outputFile, cb) {

  // The subtitle files tend to be pretty small.
  var data = fs.readFileSync(inputFile, {
    encoding: 'utf8'
  });

  var converted = opencc.convertSync(data);

  fs.writeFile(outputFile, converted, function (err) {
    return cb(err);
  });
};


module.exports = converter;
