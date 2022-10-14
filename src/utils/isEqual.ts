import isObject from './isObject';

export default function isEqual(a: object, b: object): boolean {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (const aKey in a) {
    const aV = a[aKey as keyof typeof a];
    const bV = b[aKey as keyof typeof b];

    if (isObject(aV) && isObject(bV)) {
      return isEqual(aV, bV);
    } else if (aV !== bV) {
      return false;
    }
  }
  return true;
}
