import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import Emittery from 'emittery';

// TODO: types
// eslint-disable-next-line
export default function eventEmitterPlugin(base: Base) {
  const methodNames = Object.getOwnPropertyNames(Emittery.prototype).filter((v) => v !== 'constructor');

  const eventEmitter = {
    emittery: {}
  };

  eventEmitter['emittery'] = new Emittery();

  const emitteryMethodCaller = (methodName: string) =>
    // @ts-expect-error: TODO
    function (...args) {
      // @ts-expect-error: TODO
      return base['eventEmitter']['emittery'][methodName](...args);
    };

  for (const methodName of methodNames) {
    // @ts-expect-error: TODO
    eventEmitter[methodName] = emitteryMethodCaller(methodName);
  }

  return { eventEmitter };
}
