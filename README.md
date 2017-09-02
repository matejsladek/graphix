# graphix
c++ implementation of dijkstra for nodejs   
under heavy development  
not production ready yet

```javascript
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
  ```
  
  benchmark via https://github.com/matejsladek/graph-benchmark.js   
  graph of NY roads from http://www.dis.uniroma1.it/challenge9/download.shtml (264 346 vertices; 733 846 edges)
  ```
  USA-road-NY Graphlib x 0.30 ops/sec ±18.52% (5 runs sampled)
  USA-road-NY Graphix x 0.44 ops/sec ±18.70% (7 runs sampled)
  Fastest is USA-road-NY Graphix
  ```
