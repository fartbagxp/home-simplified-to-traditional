#!/usr/bin/env node

const fs = require('fs');

const OpenCC = require('opencc');
const toutf8 = require('./to-utf8');

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
converter.convert = (inputFile, outputFile) => {

  // convert to utf8 if it isn't already
  const data = toutf8.convert(inputFile);

  // write out the subtitle
  const converted = opencc.convertSync(data);

  // add byte ordering to the converted file (to ensure Windows can read it)
  fs.writeFileSync(outputFile, converted);
};

module.exports = converter;
