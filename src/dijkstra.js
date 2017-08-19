import { PriorityQueue } from 'es-collections';

function dijkstra(graph, vertexFrom, vertexTo){
  const marked = new Set();
  let pq = new PriorityQueue((a, b) => a.dist - b.dist);
  const edges = graph.edges;
  pq.add({name: vertexFrom, dist: 0});
  while(pq.size !== 0){
    const top = pq.remove();
    const currentName = top.name;
    const currentDist = top.dist;
    if(marked.has(currentName)) continue;
    marked.add(currentName);
    if(currentName === vertexTo) return top.dist;
    if(edges.has(currentName)){
      for (let [key, value] of edges.get(currentName)) {
        const lowestPrice = Math.min(...value);
        pq.add({ name: key, dist: currentDist + lowestPrice });
      }
    }
  }
  return Infinity;
}

export default dijkstra;