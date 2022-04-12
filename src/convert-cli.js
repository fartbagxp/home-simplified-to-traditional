#!/usr/bin/env node

const converter = require('./converter');
const endswith = require('lodash.endswith');

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const program = require('commander');

const cli = {};

cli.work = () => {
  // Grab the command line arguments from the user to overwrite the data.
  program
    .version('1.0.3')
    .option('-f, --force', 'Overwrite the original file.')
    .option('-i, --input <value>', 'The input directory', '.')
    .option('-o, --output <value>', 'The output directory', '.')
    .parse(process.argv);

  const overwrite = program.opts().force;

  // Ensure the output path is there, if it is not, create the directory.
  const outDir = path.resolve(program.opts().output);
  try {
    fs.accessSync(outDir, fs.F_OK);
  } catch (e) {
    mkdirp.sync(outDir);
  }
  
  // Read the directory for all files ending in .srt
  const files = fs.readdirSync(program.opts().input);

  const srts = [];
  for(const f of files) {
    if (endswith(f, '.srt')) {
      srts.push(f);
    }
  }

  // Convert all .srt files into utf8 encoding.
  for(const s of srts) {
    const filepath = path.resolve(program.opts().input, s);

    // If the overwrite flag is turned on, use the same file path for output file.
    if (overwrite) {
      converter.convert(filepath, filepath);
    } else {
      const extname = path.extname(s);
      const basename = path.basename(s, extname) + extname;
      const newname = path.resolve(program.opts().output, basename);
      converter.convert(filepath, newname);
    }
  }

  console.log(`Converted ${srts.length} .srt files from ${program.opts().input} to ${program.opts().output}`)
};

module.exports = cli;
