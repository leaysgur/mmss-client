/* tslint:disable no-any */
export function combineEvent(baseEvent: any, ...events: any[]) {
  for (const event of [...events]) {
    for (const evName of Object.keys(event)) {
      Object.defineProperty(baseEvent.__proto__, evName, {
        value: event[evName],
        writable: true,
      });
    }
  }
}

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
