/* eslint-disable @typescript-eslint/no-explicit-any */
import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import Emittery from 'emittery';

export default function eventEmitterPlugin(base: Base): any {
  const methodNames = Object.getOwnPropertyNames(Emittery.prototype).filter((v) => v !== 'constructor');

  const eventEmitter = {
    emittery: {}
  };

  eventEmitter['emittery'] = new Emittery();

  const emitteryMethodCaller = (methodName: string) =>
    function (...args) {
      return base['eventEmitter']['emittery'][methodName](...args);
    };

  for (const methodName of methodNames) {
    eventEmitter[methodName] = emitteryMethodCaller(methodName);
  }

  return { eventEmitter };
}
