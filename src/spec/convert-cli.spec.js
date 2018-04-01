const cli = require('../convert-cli');

const _ = require('lodash');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

describe('Make sure the command line converter can convert from simplified to traditional.', function() {
  it('Ensure that the converter converted the file correctly in simple input operation.', function(done) {
    const testDir = path.resolve(__dirname, './data/');

    process.argv = ['node', 'convert-cli.js', '-i', testDir];

    cli.work();

    const outputFile = path.resolve(__dirname, './data/simplified-trad.srt');

    // Read the contents
    const data = fs.readFileSync(outputFile, {
      encoding: 'utf8'
    });

    // Ensure the output file is correct.
    expect(data).equal(
      "\ufeff1\n00:02:06,090 --> 00:02:09,300\n小夥子們 我們出發啦\nBoys, let's do this!\n"
    );

    // Read the directory for all files, make sure there's the original test files.
    const files = fs.readdirSync(testDir);
    expect(_.size(files)).equal(2);

    // Delete the output file.
    fs.unlink(outputFile, function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('Ensure that the converter converted the file correctly with output parameters.', function(done) {
    const testDir = path.resolve(__dirname, './data/');
    const outputDir = path.resolve(__dirname, './data/test');

    process.argv = ['node', 'convert-cli.js', '-i', testDir, '-o', outputDir];

    cli.work();

    const outputFile = path.resolve(
      __dirname,
      './data/test/simplified-trad.srt'
    );

    // Read the contents
    const data = fs.readFileSync(outputFile, {
      encoding: 'utf8'
    });

    // Ensure the output file is correct.
    expect(data).equal(
      "\ufeff1\r\n00:02:06,090 --> 00:02:09,300\n小夥子們 我們出發啦\r\nBoys, let's do this!\r\n"
    );

    // Delete the output file.
    rimraf(outputDir, function(err) {
      expect(err).to.be.null;
      done();
    });
  });
});
