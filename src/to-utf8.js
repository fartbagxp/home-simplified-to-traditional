#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const isUndefined = require('lodash.isundefined');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');

const converter = {};

// The maximum size used for detecting the type of encoding a file has.
// This exists because memory usage would blow up if we attempt to detect
// a file greater than couple megabytes.
converter.MAX_SIZE = 2000;

/**
 * This function converts a given file from their original encoding into another
 * file with utf8 encoding.
 *
 * @param  {[String]} path   The path of the input file
 * @return {[Boolean]} Flag that determines whether file was converted successfully.
 */
converter.convert = function (input) {

  // Read the contents
  var content = fs.readFileSync(input);

  // Use a small buffer to sniff the type of encoding the file is using.
  var maxBufferSize = content.length;
  if(maxBufferSize > converter.MAX_SIZE) {
    maxBufferSize = converter.MAX_SIZE;
  }

  var guessBuffer = content.slice(0, maxBufferSize);

  // Guess what the content should be
  var detection = jschardet.detect(guessBuffer);

  if(isUndefined(detection) || isUndefined(detection.encoding)) {
    console.error('Unknown file encoding ', path.basename(input));
    return '';
  }

  const encoding = detection.encoding.toLowerCase();

  // Try decode the content in the native encoding
  const decoded = iconv.decode(content, encoding);

  // Re-encode it in utf8
  const converted = iconv.encode(decoded, 'utf8');

  console.log('Converted data to utf8: ', converted.length);

  // return the content
  return converted;
};

module.exports = converter;
