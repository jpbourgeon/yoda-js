import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import Emittery from 'emittery';

export function eventEmitterPlugin(
  _base: Base,
  options: Base.Options
): {
  eventEmitter: Emittery;
} {
  return {
    eventEmitter: new Emittery({
      debug: {
        name: options.eventEmitterDebug?.name || 'Event emitter',
        enabled: options.eventEmitterDebug?.enabled,
        logger: options.eventEmitterDebug?.logger
      }
    })
  };
}

export function withEventEmitterPlugin<T>(base: T, options: Base.Options): T & { eventEmitter: Emittery } {
  return Object.assign(base, eventEmitterPlugin(base as unknown as Base, options));
}
