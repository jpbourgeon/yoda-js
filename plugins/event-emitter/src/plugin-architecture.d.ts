import { Base } from 'javascript-plugin-architecture-with-typescript-definitions'; // eslint-disable-line @typescript-eslint/no-unused-vars

declare module 'javascript-plugin-architecture-with-typescript-definitions' {
  namespace Base {
    interface Options {
      /**
       * Configure the debugging options for this instance event emitter.
       * @type object
       */
      eventEmitterDebug?: {
        /**
         * Define a name for the instance event emitter to use when outputting debug data.
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
         */
        logger?: (type: string, debugName?: string, eventName?: string, eventData?: Record<string, any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
      };
    }
  }
}
