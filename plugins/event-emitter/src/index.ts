/* eslint-disable @typescript-eslint/no-explicit-any */
import Emittery from 'emittery';

export default function emitteryPlugin(): any {
  const emitteryPropertyName = 'emittery';
  const eventEmitter = {
    emitteryPropertyName,
    emittery: {}
  };
  const methodNames = Object.getOwnPropertyNames(Emittery.prototype).filter((v) => v !== 'constructor');

  eventEmitter[emitteryPropertyName] = new Emittery();

  const emitteryMethodCaller = (methodName) =>
    function (...args) {
      return this[emitteryPropertyName][methodName](...args);
    };

  for (const methodName of methodNames) {
    eventEmitter[methodName] = emitteryMethodCaller(methodName);
  }

  return { eventEmitter };
}
