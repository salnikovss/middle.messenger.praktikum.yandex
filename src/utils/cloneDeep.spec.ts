import cloneDeep from './cloneDeep';

test('Test cloneDeep util', () => {
  const a = { a: { b: { c: 1 } } };
  const aClone = cloneDeep(a);
  (aClone as Record<string, unknown>).a = { c: 2 };

  expect(a).toEqual({ a: { b: { c: 1 } } });
  expect(aClone).toEqual({ a: { c: 2 } });
});
