#!/usr/bin/env node

'use strict';

var converter = require('./converter');

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var program = require('commander');

// Grab the command line arguments from the user to overwrite the data.
program
  .version('1.0.0')
  .option('-f, --force', 'Overwrite the original file.')
  .option('-p, --path <path>', 'The input directory')
  .parse(process.argv);

var overwrite = program.force;
var directory = path.resolve(program.path);

// Read the directory for all files ending in .srt
var files = fs.readdirSync(directory);

var srts = [];
_.forEach(files, function (f) {
  if (_.endsWith(f, '.srt')) {
    srts.push(f);
  }
});

// Convert all .srt files into utf8 encoding.
_.forEach(srts, function (s) {
  var filepath = path.resolve(directory, s);

  // If the overwrite flag is turned on, use the same file path for output file.
  if (overwrite) {
    converter.convert(filepath, filepath);
  } else {
    // Otherwise, include a 'trad' string in the file.
    var extname = path.extname(s);
    var basename = path.basename(s, extname) + 'trad' + extname;
    var newname = path.resolve(directory, basename);
    converter.convert(filepath, newname);
  }
});
