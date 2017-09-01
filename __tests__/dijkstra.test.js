import { dijkstra} from '../src/index';
import { basicGraph } from '../src/test-graphs';

test('test dijkstra basic', async () => {
  const finish = 4;
  const result = await dijkstra(basicGraph, 0, finish);
  expect(result).toEqual(new Map([[finish, 8]]));
});

test('test dijkstra no route', async () => {
  const finish = 5;
  const result = await dijkstra(basicGraph, 0, finish);
  expect(result).toEqual(new Map([[finish, -1]]));
});

test('test dijkstra same start and end', async () => {
  const finish = 0;
  const result = await dijkstra(basicGraph, 0, finish);
  expect(result).toEqual(new Map([[finish, 0]]));
});
