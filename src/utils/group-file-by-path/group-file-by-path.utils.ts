type subPath = `/${string}`;
type path =
  | `${subPath}`
  | `${subPath}${subPath}`
  | `${subPath}${subPath}${subPath}`
  | `${subPath}${subPath}${subPath}${subPath}`
  | `${subPath}${subPath}${subPath}${subPath}${subPath}`;

type groupOfPath = Record<string, any>;

export const indexBySubPath = (path: path): Record<string, any> => {
  const subPaths = path.split("/").reverse();
  const indexedByPath = subPaths.reduce((acc, subPath) => {
    if (subPath.length > 0) {
      return { [`/${subPath}`]: acc };
    }
    return acc;
  }, {});
  return indexedByPath;
};

export const groupFileByPath = (filePath: path[]): groupOfPath => {
  const orderedPath = filePath.sort();
  const result = orderedPath.reduce((acc, path) => {
    const indexedBySubPath = indexBySubPath(path);
    const res: Record<subPath, any> = mergeDeep({}, acc, indexedBySubPath);
    return res;
  }, {} as Record<subPath, any>);
  console.log(result);
  return result;
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
