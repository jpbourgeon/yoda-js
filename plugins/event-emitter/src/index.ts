import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import Emittery from 'emittery';
import { ILooseBase, ILooseEventEmitter, IEventEmitter } from './types';

// Use index signature to type the eventEmitter while it is under construction loosely while hooking Emittery's methods
// <https://basarat.gitbook.io/typescript/type-system/index-signatures#typescript-index-signature>
// It is definitely typed when the plugin returns

export function eventEmitterPlugin(
  base: Base,
  options: Base.Options
): {
  eventEmitter: IEventEmitter;
} {
  const methodNames = Object.getOwnPropertyNames(Emittery.prototype).filter((v) => v !== 'constructor');

  const eventEmitter: ILooseEventEmitter = {
    _emittery: new Emittery({
      debug: {
        name: 'yoda',
        ...options.eventEmitterDebug
      }
    })
  };

  const emitteryMethodCaller = (base: ILooseBase, methodName: string) =>
    function (...args: unknown[]): unknown {
      return base['eventEmitter']['_emittery'][methodName](...args);
    };

  for (const methodName of methodNames) {
    eventEmitter[methodName] = emitteryMethodCaller(base as ILooseBase, methodName);
  }

  return { eventEmitter: eventEmitter as IEventEmitter };
}

export function withEventEmitter<T>(base: T, options: Base.Options): T & { eventEmitter: IEventEmitter } {
  return Object.assign(base, eventEmitterPlugin(base as unknown as Base, options));
}
