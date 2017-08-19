class Graph {
  constructor(directed = true){
    this.directed = directed;
    this.edges = new Map();
  }

  createEdge(vertexA, vertexB, value){
    if(!this.edges.has(vertexA)) this.edges.set(vertexA, new Map());
    if(this.edges.get(vertexA).has(vertexB)) this.edges.get(vertexA).get(vertexB).push(value);
    else this.edges.get(vertexA).set(vertexB, [value]);
  }

  addEgde(vertexA, vertexB, value){
    this.createEdge(vertexA, vertexB, value);
    if(!this.directed) this.createEdge(vertexB, vertexA, value);
  }
}

export default Graph;