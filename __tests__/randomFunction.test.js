import { randomFunction, randomFunctionAsync, hello } from '../src/index'

test('test randomFunction', () => {
  expect(randomFunction()).toEqual([9, 25]);
});

test('test randomFunctionAsync', async () => {
  expect(await randomFunctionAsync()).toEqual([9, 25]);
});

test('test hello addon', async () => {
  expect(await hello()).toBe('world');
});
