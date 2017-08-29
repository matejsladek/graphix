import { Graph } from '../src/index';

const basicGraph = new Graph();
basicGraph.addEgde(0, 1, 2);
basicGraph.addEgde(1, 2, 2);
basicGraph.addEgde(2, 3, 2);
basicGraph.addEgde(3, 4, 2);
basicGraph.addEgde(0, 4, 12);

export { basicGraph };