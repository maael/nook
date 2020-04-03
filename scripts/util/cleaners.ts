export function traverseObject(
  obj: any,
  funcs: Array<(value: any, key: string) => any>
) {
  const clone = JSON.parse(JSON.stringify(obj));
  for (const i in clone) {
    for (const func of funcs) {
      clone[i] = func.apply(null, [clone[i], i]);
    }
    if (clone[i] !== null && typeof clone[i] === "object") {
      traverseObject(clone[i], funcs);
    }
  }
  return clone;
}

export default function traverse(
  obj: any,
  funcs: Array<(value: any, key: string) => any>
) {
  return Array.isArray(obj)
    ? obj.map(o => traverseObject(o, funcs))
    : traverseObject(obj, funcs);
}

export function cleanStrings(s: any) {
  return typeof s === "string"
    ? s
        .replace(/\n/g, " ")
        .replace(/\s\s+/g, " ")
        .trim()
    : s;
}