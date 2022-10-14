type PlainObject<T = unknown> = {
  [k in string | symbol]: T;
};

export default function isObject<T = unknown>(value: unknown): value is PlainObject<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}
