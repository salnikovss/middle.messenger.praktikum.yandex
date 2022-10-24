import isEqual from './isEqual';

describe('Test isEqual util', () => {
  const a = { a: { b: { c: 1 } } };
  const b = { a: { b: { c: 2 } } };
  const c = { a: { b: { d: 2 } } };

  test('Should be equal', () => {
    expect(isEqual(a, b)).toBeTruthy;
  });

  test('Should not be equal', () => {
    expect(isEqual(a, c)).not.toBeTruthy;
  });
});
