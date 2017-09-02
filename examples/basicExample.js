const graphix = require('../dist/index');

const { Graph, dijkstra } = graphix;

async function main(){
  const basicGraph = new Graph();
  basicGraph.addEdge(0, 1, 2);
  basicGraph.addEdge(1, 2, 2);
  basicGraph.addEdge(2, 3, 2);
  basicGraph.addEdge(3, 4, 2);
  basicGraph.addEdge(0, 4, 12);
  basicGraph.addEdge(5, 6, 1);

  const start = 0;
  const finish = 4;
  const result = await dijkstra(basicGraph, start, finish);
  console.log('distance from 0 -> 4', result.get(finish));
}

main().then(() => console.log('end of program'));
