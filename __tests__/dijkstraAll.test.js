import { dijkstraAll } from '../src/index';
import { basicGraph } from '../src/test-graphs';

test('test dijkstraAll basic', async () => {
  const result = await dijkstraAll(basicGraph, 0);
  const resultShould = new Map([
    [0, 0],
    [1, 2],
    [2, 4],
    [3, 6],
    [4, 8],
  ]);
  expect(result).toEqual(resultShould);
});
