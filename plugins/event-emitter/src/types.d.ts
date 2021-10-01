import { Base } from 'javascript-plugin-architecture-with-typescript-definitions'; // eslint-disable-line @typescript-eslint/no-unused-vars

// @see Source: https://github.com/sindresorhus/emittery/blob/main/index.d.ts
type DebugLogger<EventData, Name extends keyof EventData> = (
  type: string,
  debugName: string,
  eventName?: Name,
  eventData?: EventData[Name]
) => void;

declare module 'javascript-plugin-architecture-with-typescript-definitions' {
  namespace Base {
    /**
     * Overload this declaration with a custom interface to type the specific events that your plugin may provide.
     */
    interface EventData {
      [Key: keyof EventData extends undefined ? string | number : keyof EventData]: EventData[Key] extends undefined
        ? any // eslint-disable-line @typescript-eslint/no-explicit-any
        : EventData[Key];
    }

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
         * @see Source: https://github.com/sindresorhus/emittery/blob/main/index.d.ts
         */
        logger?: DebugLogger<EventData, string | number> | undefined;
      };
    }
  }
}
