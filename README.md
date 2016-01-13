# murray-simplified-to-traditional
This project is a utility project for a home entertainment center to convert utf8 simplified chinese files to traditional chinese files.

It uses a simple converter that takes an input file (in utf-8) form, and attempts to convert all the text in it with simplified chinese characters to traditional chinese characters (in Hong Kong region).

# Installation

I typically run this on node v0.12.

``` javascript
git clone git@github.com:fartbagxp/murray-simplified-to-traditional.git

cd murray-simplified-to-traditional

npm install -g murray-simplified-to-traditional
```

# Usage
Once you have installed this library, the following command should be available to you.

``` javascript
> totrad -h

  Usage: convert-cli [options]

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -f, --force        Overwrite the original file.
    -p, --path <path>  The input directory
```
