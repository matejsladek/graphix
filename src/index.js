require("babel-polyfill");

function randomFunction() {
  const values = [3, 5];
  return values.map(a => a*a);
}

const binary = require('node-pre-gyp');
const path = require('path');
const binding_path = binary.find(path.resolve(path.join(__dirname,'../package.json')));
const binding = require(binding_path);
const hello = binding.hello;

import Graph from './Graph';

// const Graph = require('./Graph').default;

export { hello, randomFunction, Graph };

require('assert').equal(binding.hello(), "world");