import isObject from './isObject';

describe('Test isObject util', () => {
  test('Should be an object', () => {
    expect(isObject({ a: { b: { c: 1 } } })).toBeTruthy;
  });

  test('Should not be an object', () => {
    const b = new Map();
    b.set('a', 2);

    expect(isObject(b)).not.toBeTruthy;
    expect(isObject('text')).not.toBeTruthy;
    expect(isObject(2)).not.toBeTruthy;
    expect(isObject(new Set())).not.toBeTruthy;
    expect(isObject(Symbol('1'))).not.toBeTruthy;
  });
});
