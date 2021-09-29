import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import Emittery from 'emittery';

/**
 *
 * Extends the base class with an eventEmitter property
 *
 * @param _base
 * @param options
 */
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

/**
 *
 * Utility function for plugin composition
 * Extends the base class with an eventEmitter property
 *
 * @param _base
 * @param options
 */
export function withEventEmitterPlugin<T>(base: T, options: Base.Options): T & { eventEmitter: Emittery } {
  return Object.assign(base, eventEmitterPlugin(base as unknown as Base, options));
}
