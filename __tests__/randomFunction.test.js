import { randomFunction, randomFunctionAsync, hello } from '../src/index'

test('test randomFunction', () => {
  expect(randomFunction()).toEqual([9, 25]);
});

test('test randomFunctionAsync', () => {
  return randomFunctionAsync().then(data => expect(data).toEqual([9, 25]));
});

test('test hello addon', () => {
  return hello().then(data => expect(data).toBe('world'));
});
