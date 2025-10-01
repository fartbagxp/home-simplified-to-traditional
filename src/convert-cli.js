#!/usr/bin/env node

const converter = require('./converter');
const endswith = require('lodash.endswith');

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const { Command } = require('commander');
const packageJson = require('../package.json');

const cli = {};

cli.work = () => {
  const program = new Command();
  program
    .version(packageJson.version)
    .option('-f, --force', 'Overwrite the original file.')
    .option('-i, --input <value>', 'The input directory', '.')
    .option('-o, --output <value>', 'The output directory')
    .parse(process.argv);

  const overwrite = program.opts().force;
  const inputDir = program.opts().input;
  const outputDir = program.opts().output || path.join(inputDir, 'srt');

  // Read the directory for all files ending in .srt
  const files = fs.readdirSync(inputDir);

  const srts = [];
  for(const f of files) {
    if (endswith(f, '.srt')) {
      srts.push(f);
    }
  }

  // Only create the output directory if there are files to convert
  if (srts.length > 0 && !overwrite) {
    const outDir = path.resolve(outputDir);
    try {
      fs.accessSync(outDir, fs.F_OK);
    } catch (e) {
      mkdirp.sync(outDir);
    }
  }

  // Convert all .srt files into utf8 encoding.
  for(const s of srts) {
    const filepath = path.resolve(inputDir, s);

    // If the overwrite flag is turned on, use the same file path for output file.
    if (overwrite) {
      converter.convert(filepath, filepath);
    } else {
      const extname = path.extname(s);
      const basename = path.basename(s, extname) + extname;
      const newname = path.resolve(outputDir, basename);
      converter.convert(filepath, newname);
    }
  }

  console.log(`Converted ${srts.length} .srt files from ${inputDir} to ${outputDir}`)
};

module.exports = cli;
