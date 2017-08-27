import 'babel-polyfill';
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

export { randomFunction, randomFunctionAsync, Graph, dijkstra };
