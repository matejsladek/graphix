const binary = require('node-pre-gyp');
const path = require('path');

const bindingPath = binary.find(path.resolve(path.join(__dirname, '../package.json')));
const binding = require(bindingPath);

const hello = binding.hello;
const dijkstra = binding.dijkstra;

export { hello, dijkstra };
