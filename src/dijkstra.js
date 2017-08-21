import { PriorityQueue } from 'es-collections';

function dijkstra(graph, vertexFrom, vertexTo){
  const start = graph.getNode(vertexFrom).__id__;
  const finish = graph.getNode(vertexTo).__id__;
  const marked = new Set();
  const pq = new PriorityQueue((a, b) => a.dist - b.dist);
  const edges = graph.edges;
  pq.add({name: start, dist: 0});
  while(pq.size !== 0){
    const top = pq.remove();
    const currentName = top.name;
    const currentDist = top.dist;
    if(marked.has(currentName)) continue;
    marked.add(currentName);
    if(currentName === finish) return top.dist;
    if(edges.has(currentName)){
      edges.get(currentName).forEach((value, key) => {
        if(value.length === 0) return;
        const weights = value.map(elem => elem.weight);
        const lowestWeight = Math.min(...weights);
        pq.add({ name: key, dist: currentDist + lowestWeight });
      });
    }
  }
  return Infinity;
}

export default dijkstra;
