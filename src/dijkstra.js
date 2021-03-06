import { PriorityQueue } from 'es-collections';

let binding;
try{
  binding = require('./binding');
} catch(err){}

function getInfinityDistances(nodes){
  const distances = new Map();
  nodes.forEach(val => distances.set(val, -1));
  return distances;
}

function fillInfinityDistances(graph, result){
  const nodes = graph.getNodesIdArray();
  nodes.forEach(val => {
    if(!result.has(val)) result.set(val, -1);
  });
  return result;
}

function convertDistancesIdsToNames(graph, distances){
  const result = new Map();
  distances.forEach((val, key) => {
    result.set(graph.getNodeById(key).name, val);
  });
  return result;
}

function dijkstraJavascript(graph, start, finish){
  const marked = new Set();
  const pq = new PriorityQueue((a, b) => a.dist - b.dist);
  const edges = graph.getAdjList();
  const distances = new Map();
  pq.add({name: start, dist: 0});
  while(pq.size !== 0){
    const top = pq.remove();
    const currentName = top.name;
    const currentDist = top.dist;
    if(marked.has(currentName)) continue;
    marked.add(currentName);
    if(currentName === finish) return new Map([[currentName, currentDist]]);
    distances.set(currentName, currentDist);
    if(edges.has(currentName)){
      edges.get(currentName).forEach((value, key) => {
        if(value.length === 0) return;
        const weights = value.map(elem => elem.weight);
        const lowestWeight = Math.min(...weights);
        pq.add({ name: key, dist: currentDist + lowestWeight });
      });
    }
  }
  if(finish === -2) return distances;
  return new Map([[finish, -1]]);
}

function dijkstraCpp(graph, vertexFrom, vertexTo){
  return new Promise((resolve) => {
    const dijkstraCppImpl = binding.dijkstra;
    const edges = graph.getAdjListArrayBuffer();
    dijkstraCppImpl(edges, vertexFrom, vertexTo, resolve);
  });
}

function transformArrayBufferToMap(arrayBuffer){
  const arr = new Int32Array(arrayBuffer);
  const res = new Map();
  for(let i = 0; i < arr.length; i+=2){
    res.set(arr[i], arr[i+1]);
  }
  return res;
}

function dijkstraImpl(graph, vertexFrom, vertexTo, all = false){
  return new Promise(async (resolve) => {
    const start = graph.getNode(vertexFrom).__id__;
    const finish = graph.getNode(vertexTo).__id__;
    try{
      if(all) {
        const result = await dijkstraCpp(graph, start, -2);
        resolve(
          convertDistancesIdsToNames(
            graph, fillInfinityDistances(
              graph, transformArrayBufferToMap(result),
            ),
          ),
        );
      } else {
        const result = await dijkstraCpp(graph, start, finish);
        resolve(convertDistancesIdsToNames(graph, transformArrayBufferToMap(result)));
      }
    } catch(err){
      let output;
      if(all) output = fillInfinityDistances(graph, dijkstraJavascript(graph, start, -2));
      else output = dijkstraJavascript(graph, start, finish);
      output = convertDistancesIdsToNames(graph, output);
      resolve(output);
    }
  });
}

function dijkstra(graph, vertexFrom, vertexTo){
  return dijkstraImpl(graph, vertexFrom, vertexTo, false);
}

function dijkstraAll(graph, vertexFrom){
  return dijkstraImpl(graph, vertexFrom, -1, true);
}


export { dijkstra, dijkstraAll };
