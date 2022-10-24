import mergeDeep from './mergeDeep';

test('Test mergeDeep util', () => {
  const a = { a: { b: { c: 1 } } };
  const b = { a: { b: { d: 2 } } };
  expect(mergeDeep(a, b)).toEqual({ a: { b: { c: 1, d: 2 } } });
});
