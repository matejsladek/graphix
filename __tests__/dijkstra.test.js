import { dijkstra, Graph } from '../src/index'

test('test dijkstra basic', () => {
  const g = new Graph();
  g.addEgde(0, 1, 2);
  g.addEgde(1, 2, 2);
  g.addEgde(2, 3, 2);
  g.addEgde(3, 4, 2);
  g.addEgde(0, 4, 12);

  expect(dijkstra(g, 0, 4)).toBe(8);
});

test('test dijkstra no route', () => {
  const g = new Graph();
  g.addEgde(0, 1, 2);
  g.addEgde(1, 2, 2);
  g.addEgde(2, 3, 2);
  g.addEgde(3, 4, 2);
  g.addEgde(0, 4, 12);

  expect(dijkstra(g, 0, 5)).toBe(Infinity);
});

test('test dijkstra same start and end', () => {
  const g = new Graph();
  g.addEgde(0, 1, 2);
  g.addEgde(1, 2, 2);
  g.addEgde(2, 3, 2);
  g.addEgde(3, 4, 2);
  g.addEgde(0, 4, 12);

  expect(dijkstra(g, 0, 0)).toBe(0);
});