'use strict';

var cli = require('../convert-cli');

var _ = require('lodash');
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

describe('Make sure the command line converter can convert from simplified to traditional.', function () {
  it('Ensure that the converter converted the file correctly in simple input operation.',
    function (done) {

      var testDir = path.resolve(__dirname, './data/');

      process.argv = ['node',
        'convert-cli.js',
        '-i',
        testDir
      ];

      cli.work();

      var outputFile = path.resolve(__dirname, './data/simplified-trad.srt');

      // Read the contents
      var data = fs.readFileSync(outputFile, {
        encoding: 'utf8'
      });

      // Ensure the output file is correct.
      expect(data).equal('1\n00:02:06,090 --> 00:02:09,300\n小夥子們 我們出發啦\nBoys, let\'s do this!\n');

      // Read the directory for all files, make sure there's the original test files.
      var files = fs.readdirSync(testDir);
      expect(_.size(files)).equal(2);

      // Delete the output file.
      fs.unlink(outputFile, function (err) {
        expect(err).to.be.null;
        done();
      });

    });

  it('Ensure that the converter converted the file correctly with output parameters.',
    function (done) {

      var testDir = path.resolve(__dirname, './data/');
      var outputDir = path.resolve(__dirname, './data/test');

      process.argv = ['node',
        'convert-cli.js',
        '-i',
        testDir,
        '-o',
        outputDir
      ];

      cli.work();

      var outputFile = path.resolve(__dirname, './data/test/simplified-trad.srt');

      // Read the contents
      var data = fs.readFileSync(outputFile, {
        encoding: 'utf8'
      });

      // Ensure the output file is correct.
      expect(data).equal('1\n00:02:06,090 --> 00:02:09,300\n小夥子們 我們出發啦\nBoys, let\'s do this!\n');

      // Delete the output file.
      rimraf(outputDir, function (err) {
        expect(err).to.be.null;
        done();
      });
    });
});
