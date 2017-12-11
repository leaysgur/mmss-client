import { action } from 'mobx';

export function actionAll(instance) {
  const methods = _getProtoMethodNames(instance);
  methods.forEach(methodName => {
    instance[methodName] = action(instance[methodName]);
  });
}

export function bindAll(instance) {
  const methods = _getProtoMethodNames(instance);
  methods.forEach(methodName => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

function _getProtoMethodNames(instance) {
  const proto = Object.getPrototypeOf(instance);
  return Object.getOwnPropertyNames(proto).filter(name => {
    return name !== 'constructor' && typeof proto[name] === 'function';
  });
}
