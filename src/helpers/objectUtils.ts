export const getIn = function (obj: object = {}, path: string) {
  if (!path) {
    return undefined;
  }

  for (let i = 0, paths = path.split('.'), len = paths.length; i < len; i++) {
    const property = paths[i];
    obj = obj[property];
  }

  return obj as any;
};

export const setInRecursive = function (sourceObject, paths: string[], value: any) {
  const rootProperty = paths.shift();

  if (paths.length === 1) {
    sourceObject[rootProperty][paths[0]] = value;
    return;
  }

  sourceObject = sourceObject[rootProperty];

  return setInRecursive(sourceObject, paths, value);
};

export const setIn = function <T>(sourceObject: T, path: string, value: any): T {
  if (!path) {
    return sourceObject;
  }

  const nextObject = { ...sourceObject };
  const paths = path.split('.');
  setInRecursive(nextObject, paths, value);
  return nextObject;
};
