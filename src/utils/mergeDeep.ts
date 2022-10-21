export default function mergeDeep(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = mergeDeep(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}
