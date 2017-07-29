#!/usr/bin/env node

'use strict';

var converter = require('./converter');

var _ = require('lodash');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var program = require('commander');

var cli = {};

cli.work = function () {

  // Grab the command line arguments from the user to overwrite the data.
  program
    .version('1.0.0')
    .option('-f, --force', 'Overwrite the original file.')
    .option('-i, --input <path>', 'The input directory')
    .option('-o, --output <path>', 'The output directory')
    .parse(process.argv);

  var overwrite = program.force;
  // Make sure the input directory exist, if it doesn't, default to current dir
  var inDir;
  if (_.isUndefined(program.input)) {
    inDir = path.resolve('.');
  } else {
    inDir = path.resolve(program.input);
  }

  var outDir;

  // Ensure the output path is there, if it is not, create the directory.
  if (!_.isUndefined(program.output)) {
    outDir = path.resolve(program.output);

    try {
      fs.accessSync(outDir, fs.F_OK);
    } catch (e) {
      mkdirp.sync(outDir);
    }
  }

  // Read the directory for all files ending in .srt
  var files = fs.readdirSync(inDir);

  var srts = [];
  _.forEach(files, function (f) {
    if (_.endsWith(f, '.srt')) {
      srts.push(f);
    }
  });

  // Convert all .srt files into utf8 encoding.
  _.forEach(srts, function (s) {
    var filepath = path.resolve(inDir, s);

    // If the overwrite flag is turned on, use the same file path for output file.
    if (overwrite) {
      converter.convert(filepath, filepath);
    } else {
      var extname = path.extname(s);
      var basename = path.basename(s, extname) + extname;
      var newname;
      if (_.isUndefined(outDir)) {
        newname = path.resolve(inDir, basename);
      } else {
        newname = path.resolve(outDir, basename);
      }
      converter.convert(filepath, newname);
    }
  });

};

module.exports = cli;
