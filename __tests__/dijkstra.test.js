import { dijkstra} from '../src/index';
import { basicGraph } from '../src/test-graphs';

test('test dijkstra basic', async () => {
  expect(await dijkstra(basicGraph, 0, 4)).toBe(8);
});

test('test dijkstra no route', async () => {
  expect(await dijkstra(basicGraph, 0, 5)).toBe(-1);
});

test('test dijkstra same start and end', async () => {
  expect(await dijkstra(basicGraph, 0, 0)).toBe(0);
});
