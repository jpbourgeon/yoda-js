import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import Emittery from 'emittery';

// Helper type for turning the passed `EventData` type map into a list of string keys that don't require data alongside the event name when emitting. Uses the same trick that `Omit` does internally to filter keys by building a map of keys to keys we want to keep, and then accessing all the keys to return just the list of keys we want to keep.
// @see Source : <https://github.com/sindresorhus/emittery/blob/main/index.d.ts>
type DatalessEventNames<EventData> = {
  [Key in keyof EventData]: EventData[Key] extends undefined ? Key : never;
}[keyof EventData];
declare const listenerAdded: unique symbol;
declare const listenerRemoved: unique symbol;
export type OmnipresentEventData = {
  [listenerAdded]: Emittery.ListenerChangedData;
  [listenerRemoved]: Emittery.ListenerChangedData;
};

// @see Source: <https://github.com/sindresorhus/emittery/blob/main/index.d.ts>
type DebugLogger<EventData, Name extends keyof EventData> = (
  type: string,
  debugName: string,
  eventName?: Name,
  eventData?: EventData[Name]
) => void;

declare module 'javascript-plugin-architecture-with-typescript-definitions' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Base {
    /**
     * Overload this declaration with a custom interface to type the specific events that your plugin may provide.
     * @see Source: <https://github.com/sindresorhus/emittery#typescript>
     */
    interface EventData {} // eslint-disable-line @typescript-eslint/no-empty-interface

    interface Options {
      /**
       * Configure the debugging options of the event emitter.
       * @type object
       */
      eventEmitterDebug?: {
        /**
         * Define a name, for the instance event emitter, to use when outputting debug data.
         * @type string
         * @default `Event emitter`
         */
        name?: 'Event emitter' | string;
        /**
         * Toggle the event emitter debug logging just for this instance.
         * @type boolean
         * @default false
         */
        enabled?: boolean;
        /**
         * Function that handles the event emitter debug data.
         * @see Source: <https://github.com/sindresorhus/emittery/blob/main/index.d.ts>
         */
        logger?: DebugLogger<EventData, keyof EventData>;
      };
    }
  }
}

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
