'use strict';

var converter = require('../converter');

var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');

describe('Make sure the converter works for converting simplified chinese files to traditional.', function () {
  it('Ensure that the converter converted the file correctly.',
    function (done) {

      var inputFile = path.resolve(__dirname, './data/simplified.txt');
      var outputFile = path.resolve(__dirname, './data/traditional.txt');

      // Convert the output file from simplified chinese to traditional chinese.
      converter.convert(inputFile, outputFile);

      // Read the output file
      var data = fs.readFileSync(outputFile, {
        encoding: 'utf8'
      });

      // Ensure the output file is correct.
      expect(data).equal('1\n00:02:06,090 --> 00:02:09,300\n小夥子們 我們出發啦\nBoys, let\'s do this!\n');

      // Delete the output file.
      fs.unlink(outputFile, function (err) {
        expect(err).to.be.null;
        done();
      });
    });
});
