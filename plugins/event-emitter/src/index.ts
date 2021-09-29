import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import Emittery from 'emittery';

// Helper type for turning the passed `EventData` type map into a list of string keys that don't require data alongside the event name when emitting. Uses the same trick that `Omit` does internally to filter keys by building a map of keys to keys we want to keep, and then accessing all the keys to return just the list of keys we want to keep.
// @see <https://github.com/sindresorhus/emittery/blob/main/index.d.ts>
type DatalessEventNames<EventData> = {
  [Key in keyof EventData]: EventData[Key] extends undefined ? Key : never;
}[keyof EventData];
declare const listenerAdded: unique symbol;
declare const listenerRemoved: unique symbol;
export type OmnipresentEventData = {
  [listenerAdded]: Emittery.ListenerChangedData;
  [listenerRemoved]: Emittery.ListenerChangedData;
};

/**
 *
 * Extends the base class with an fully qualified Emittery instance accessible from the eventEmitter property of your base class instances
 *
 * @param _base
 * @param options
 */
export function eventEmitterPlugin(
  _base: Base,
  options: Base.Options
): {
  eventEmitter: Emittery<Base.EventData, Base.EventData & OmnipresentEventData, DatalessEventNames<Base.EventData>>;
} {
  return {
    eventEmitter: new Emittery<
      Base.EventData,
      Base.EventData & OmnipresentEventData,
      DatalessEventNames<Base.EventData>
    >({
      debug: {
        name: options?.eventEmitterDebug?.name || 'Event emitter',
        enabled: options?.eventEmitterDebug?.enabled,
        logger: options?.eventEmitterDebug?.logger
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
export function withEventEmitterPlugin<T>(
  base: T,
  options: Base.Options
): T & {
  eventEmitter: Emittery<Base.EventData, Base.EventData & OmnipresentEventData, DatalessEventNames<Base.EventData>>;
} {
  return Object.assign(base, eventEmitterPlugin(base as unknown as Base, options));
}
