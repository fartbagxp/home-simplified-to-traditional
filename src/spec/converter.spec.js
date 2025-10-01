const converter = require('../converter');

const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

describe('Make sure the converter works for converting simplified chinese files to traditional.', () => {
  it('Ensure that the converter converted the file correctly.', () => {
    const inputFile = path.resolve(__dirname, './data/simplified.srt');
    const outputFile = path.resolve(__dirname, './data/traditional.srt');

    // Convert the output file from simplified chinese to traditional chinese.
    converter.convert(inputFile, outputFile);

    // Read the output file
    const data = fs.readFileSync(outputFile, {
      encoding: 'utf8'
    });

    // Ensure the output file is correct.
    expect(data).equal(
      "1\n00:02:06,090 --> 00:02:09,300\n小夥子們 我們出發啦\nBoys, let's do this!\n"
    );
  });
});
