import 'babel-polyfill';
import { hello } from './binding';
import Graph from './Graph';
import dijkstra from './dijkstra';

function randomFunction() {
  const values = [3, 5];
  return values.map(a => a * a);
}

async function randomFunctionAsync() {
  const values = [3, 5];
  return values.map(a => a * a);
}

export { hello, randomFunction, randomFunctionAsync, Graph, dijkstra };
