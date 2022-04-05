const cli = require('../convert-cli');

const _ = require('lodash');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

describe('Make sure the command line converter can convert from simplified to traditional.', () => {
  it('convert file simple input operation.', () => {
    const testDir = path.resolve(__dirname, './data/');

    process.argv = ['node', 'convert-cli.js', '-i', testDir];

    cli.work();

    const outputFile = path.resolve(__dirname, './data/simplified.srt');

    // Read the contents
    const data = fs.readFileSync(outputFile, {
      encoding: 'utf8'
    });

    console.log(data);

    // Ensure the output file is correct.
    expect(data).equal(
      "\ufeff\ufeff\ufeff1\n00:02:06,090 --> 00:02:09,300\n小夥子們 我們出發啦\nBoys, let's do this!\n"
    );
  });

  it('convert file output parameter', () => {
    const testDir = path.resolve(__dirname, './data/');
    const outputDir = path.resolve(__dirname, './data/');

    process.argv = ['node', 'convert-cli.js', '-i', testDir, '-o', outputDir];

    cli.work();

    const outputFile = path.resolve(
      __dirname,
      './data/simplified.srt'
    );

    // Read the contents
    const data = fs.readFileSync(outputFile, {
      encoding: 'utf8'
    });

    console.log(String.raw`${data}`);

    // Ensure the output file is correct.
    expect(data).equal(
      "\ufeff\ufeff\ufeff1\n00:02:06,090 --> 00:02:09,300\n小夥子們 我們出發啦\nBoys, let's do this!\n"
    );
  });
});
