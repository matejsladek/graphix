import { Graph } from '../src/index';

const basicGraph = new Graph();
basicGraph.addEdge(0, 1, 2);
basicGraph.addEdge(1, 2, 2);
basicGraph.addEdge(2, 3, 2);
basicGraph.addEdge(3, 4, 2);
basicGraph.addEdge(0, 4, 12);
basicGraph.addEdge(5, 6, 1);

export { basicGraph };