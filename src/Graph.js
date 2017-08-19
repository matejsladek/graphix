export default class Graph {
  constructor(directed = false){
    this.directed = directed;
    this.edges = {};
  }

  createEdge(vertexA, vertexB, value){
    if(!(vertexA in this.edges)) this.edges[vertexA] = {};
    if(vertexB in this.edges[vertexA]) this.edges[vertexA][vertexB].push(value);
    else this.edges[vertexA][vertexB] = [value];
  }

  addEgde(vertexA, vertexB, value){
    this.createEdge(vertexA, vertexB, value);
    if(!this.directed) this.createEdge(vertexB, vertexA, value);
  }
}