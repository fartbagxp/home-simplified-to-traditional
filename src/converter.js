#!/usr/bin/env node

const fs = require('fs');
const OpenCC = require('opencc');

// Load the default Simplified to Traditional HK config
const opencc = new OpenCC('s2hk.json');

const converter = {};

/**
 *  This function converts the input file (in utf-8) and all the simplified
 *  chinese text in there to traditional chinese.
 *
 * @param  {[String]}   inputFile The input file in utf-8 form.
 * @param  {[String]}   outputFile The output file with all the traditional text
 */
converter.convert = function(inputFile, outputFile) {
  const options = {
    encoding: 'utf8'
  };

  // The subtitle files tend to be pretty small.
  const data = fs.readFileSync(inputFile, options);

  // write out the subtitle
  const converted = opencc.convertSync(data);

  // add byte ordering to the converted file (to ensure Windows can read it)
  fs.writeFileSync(outputFile, `\ufeff${converted}`, options);
};

module.exports = converter;
