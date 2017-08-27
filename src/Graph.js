class Graph {
  constructor(directed = true){
    this.directed = directed;
    this.nodes = new Map();
    this.nodeToId = new Map();
    this.idToEdge = new Map();
    this.idToNode = new Map();
    this.highestNodeId = 0;
    this.edges = new Map();
    this.highestEdgeId = 0;
    this.nodeDefaultLabel = '';
    this.edgeDefaultLabel = '';
  }

  addNode(name, label = this.nodeDefaultLabel){
    this.highestNodeId += 1;
    const id = this.highestNodeId;
    this.nodeToId.set(name, id);
    this.idToNode.set(id, name);
    this.nodes.set(id, label);
    return this.highestNodeId;
  }

  hasNode(name){
    return this.nodeToId.has(name);
  }

  hasNodeById(id){
    return this.idToNode.has(id);
  }

  getNonExistentPoint(){
    return {
      __id__: -1,
    };
  }

  getNodes(){
    const nodes = [];
    for(const id of nodes.keys()){
      nodes.push(this.getNodeById(id));
    }
    return nodes;
  }

  getNode(name) {
    if(!this.hasNode(name)) return this.getNonExistentPoint();
    return {
      __id__: this.nodeToId.get(name),
      name,
      label: this.nodes.get(name),
    };
  }

  getNodeById(id) {
    if(!this.hasNodeById(id)) return this.getNonExistentPoint();
    return {
      __id__: id,
      name: this.idToNode.get(id),
      label: this.nodes.get(id),
    };
  }

  removeNode(name){
    if(!this.hasNode(name)) return -1;
    const id = this.nodeToId.get(name);
    this.nodes.delete(id);
    this.nodeToId.delete(id);
    this.idToNode.delete(id);

    this.edges.delete(id);
    const keys = this.edges.keys();
    for(const key of keys){
      this.edges.get(key).delete(id);
    }
  }

  getAdjList(){
    return this.edges;
  }

  createEdge(vertexA, vertexB, weight, id){
    if(!this.edges.has(vertexA)) this.edges.set(vertexA, new Map());
    const edge = {__id__: id, weight};
    if(this.edges.get(vertexA).has(vertexB)) this.edges.get(vertexA).get(vertexB).push(edge);
    else this.edges.get(vertexA).set(vertexB, [edge]);
  }

  addEgde(vertexA, vertexB, weight=1, name='', label=this.edgeDefaultLabel){
    if(!this.hasNode(vertexA)) this.addNode(vertexA);
    if(!this.hasNode(vertexB)) this.addNode(vertexB);
    const nodeIdA = this.nodeToId.get(vertexA);
    const nodeIdB = this.nodeToId.get(vertexB);
    this.highestEdgeId += 1;
    const edgeId = this.highestEdgeId;
    const edgeObj = {__id__: edgeId, name, label, weight};
    this.idToEdge.set(edgeId, edgeObj);
    this.createEdge(nodeIdA, nodeIdB, weight, edgeId);
    if(!this.directed) this.createEdge(nodeIdB, nodeIdA, weight, edgeId);
    return edgeObj;
  }

  getEdgeById(id){
    return this.idToEdge(id);
  }

  getEdgeByName(name){
    let result = [];
    const keysA = this.edges.keys();
    for(const keyA of keysA){
      const keysB = this.edges.get(keyA).keys();
      for(const keyB of keysB) {
        const newArray = this.edges.get(keyA).get(keyB).filter(elem => elem.name === name);
        result = [...result, ...newArray];
      }
    }
    return result;
  }

  removeEdge(nodeA, nodeB) {
    const nodeIdA = this.nodeToId.get(nodeA);
    const nodeIdB = this.nodeToId.get(nodeB);
    this.edges.get(nodeIdA).delete(nodeIdB);
    if (!this.directed) this.edges.get(nodeIdB).delete(nodeIdA);
  }

  removeEdgeByFunc(func){
    const keysA = this.edges.keys();
    for(const keyA of keysA){
      const keysB = this.edges.get(keyA).keys();
      for(const keyB of keysB) {
        const newArray = this.edges.get(keyA).get(keyB).filter((elem) => {
          if(func(elem)){
            const id = this.edges.get(keyA).get(keyB).__id__;
            this.idToEdge.delete(id);
            return false;
          }
          return true;
        });
        this.edges.get(keyA).set(keyB, newArray);
      }
    }
  }

  removeEdgeById(id){
    this.removeEdgeByFunc(elem => elem.__id__ !== id);
  }

  removeEdgeByName(name){
    this.removeEdgeByFunc(elem => elem.name !== name);
  }

  setNodeDefaultLabel(label){
    this.nodeDefaultLabel = label;
  }

  setEdgeDefaultLabel(label){
    this.edgeDefaultLabel = label;
  }

  getAdjListArrayBuffer(){
    let numberOfEdges = 0;
    this.edges.forEach((val) => {
      numberOfEdges += val.size;
    });
    if(!this.directed) numberOfEdges /= 2;
    const arraySize = numberOfEdges * 3;
    const i32a = new Int32Array(arraySize);
    let index = 0;
    this.edges.forEach((val, keyA) => {
      val.forEach((edgesArray, keyB) => {
        edgesArray.forEach((edgeVal) => {
          i32a[index++] = keyA;
          i32a[index++] = keyB;
          i32a[index++] = edgeVal.weight;
        });
      });
    });
    return i32a.buffer;
  }
}

export default Graph;
