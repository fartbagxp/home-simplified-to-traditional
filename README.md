# murray-simplified-to-traditional

This project is a utility project for a home entertainment center to convert utf8 simplified chinese files to traditional chinese files.

It uses a simple converter that takes an input file (in utf-8) form, and attempts to convert all the text in it with simplified chinese characters to traditional chinese characters (in Hong Kong region).

## Installation

* Note: On Windows, OpenCC 1.0.4 requires Microsoft Visual C++ 2013 version. So make sure to set `npm set 2013` prior to building.

```javascript
git clone git@github.com:fartbagxp/murray-simplified-to-traditional.git

npm install -g murray-simplified-to-traditional
```

## Usage

Once you have installed this library, the following command should be available to you.

```javascript
> totrad -h

  Usage: convert-cli [options]

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -f, --force        Overwrite the original file.
    -p, --path <path>  The input directory
```
