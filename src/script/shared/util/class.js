// @flow
import { action } from 'mobx';

export function actionAll(instance: Object): void {
  const methods = _getProtoMethodNames(instance);
  methods.forEach(methodName => {
    instance[methodName] = action(instance[methodName]);
  });
}

export function bindAll(instance: Object): void {
  const methods = _getProtoMethodNames(instance);
  methods.forEach(methodName => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

function _getProtoMethodNames(instance: Object): string[] {
  const proto = Object.getPrototypeOf(instance);
  return Object.getOwnPropertyNames(proto)
    .filter(name => {
      return name !== 'constructor' && typeof proto[name] === 'function';
    });
}
