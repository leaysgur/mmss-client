/* tslint:disable no-any */
export function bindAll(instance: any) {
  const methods = _getProtoMethodNames(instance);
  methods.forEach(methodName => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

function _getProtoMethodNames(instance: object): string[] {
  const proto = Object.getPrototypeOf(instance);
  return Object.getOwnPropertyNames(proto).filter(name => {
    return name !== 'constructor' && typeof proto[name] === 'function';
  });
}
