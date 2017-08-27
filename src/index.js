import 'babel-polyfill';
import Graph from './Graph';
import dijkstra from './dijkstra';
import hello from './hello';

function randomFunction() {
  const values = [3, 5];
  return values.map(a => a * a);
}

async function randomFunctionAsync() {
  const values = [3, 5];
  return values.map(a => a * a);
}

export { hello, randomFunction, randomFunctionAsync, Graph, dijkstra };
