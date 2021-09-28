import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import Emittery from 'emittery';

declare module 'javascript-plugin-architecture-with-typescript-definitions' {
  /* eslint-disable-next-line @typescript-eslint/no-namespace */
  namespace Base {
    interface Options {
      /**
       * Event emitter debugging options
       */
      eventEmitterDebug?: {
        /**
         * Toggle the event emitter debug logging just for this instance
         */
        enabled?: boolean;
        /**
         * Function that handles the event emitter debug data.
         */
        logger?: (...args: unknown[]) => unknown;
      };
    }
  }
}

// Type stub : use index signature to loosely type objects under construction
interface IndexSignature {
  [key: string]: any; //eslint-disable-line @typescript-eslint/no-explicit-any
}

export type ILooseEventEmitter = IndexSignature;
export interface ILooseBase extends Base {
  eventEmitter: IndexSignature;
}

type UnsubscribeFn = () => void;
type EventData = IndexSignature;
type AllEventData = IndexSignature;

export interface IEventEmitter {
  _emittery: Emittery;

  logIfDebugEnabled: (...args: unknown[]) => unknown;

  on: <Name extends keyof AllEventData>(
    eventName: Name | Name[],
    listener: (eventData: AllEventData[Name]) => void | Promise<void>
  ) => UnsubscribeFn;

  off: (...args: unknown[]) => unknown;
  once: (...args: unknown[]) => unknown;

  events: <Name extends keyof EventData>(eventName: Name | Name[]) => AsyncIterableIterator<EventData[Name]>;

  emit: (...args: unknown[]) => unknown;
  emitSerial: (...args: unknown[]) => unknown;
  onunknown: (...args: unknown[]) => unknown;
  unknownEvent: (...args: unknown[]) => unknown;
  offAny: (...args: unknown[]) => unknown;
  clearListeners: (...args: unknown[]) => unknown;
  listenerCount: (...args: unknown[]) => unknown;
  bindMethod: (...args: unknown[]) => unknown;
}
