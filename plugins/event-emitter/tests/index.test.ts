import { jest } from '@jest/globals';
import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import { eventEmitterPlugin, withEventEmitterPlugin } from '../src/index';
import Emittery from 'emittery';

// Test custom Event type definition
declare module 'javascript-plugin-architecture-with-typescript-definitions' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Base {
    interface EventData {
      myEvent: number;
    }
  }
}
// Test custom Event type definition extension
declare module 'javascript-plugin-architecture-with-typescript-definitions' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Base {
    interface EventData {
      myOtherEvent: undefined;
    }
  }
}

describe('The event emitter plugin', () => {
  it('should add an instance of Emittery to the base class', () => {
    const Yoda = Base.withPlugins([eventEmitterPlugin]).withDefaults({});
    const instance = new Yoda();
    expect(instance.eventEmitter).toBeInstanceOf(Emittery);
  });

  it('should provide a utility function for plugin composability', () => {
    function emittingPlugin(base: Base, options: Base.Options) {
      const instance = withEventEmitterPlugin(base, options);
      async function emitEvent() {
        await instance.eventEmitter.emit('myOtherEvent');
      }
      const props: { emitEvent: () => void } = {
        emitEvent
      };
      return props;
    }
    const Yoda = Base.withPlugins([emittingPlugin]).withDefaults({});
    const instance = new Yoda();
    const eventEmitterMethods = Object.getOwnPropertyNames(instance);
    expect(eventEmitterMethods).toEqual(expect.arrayContaining(['options', 'eventEmitter', 'emitEvent']));
  });

  it('should enable cross plugins communication', async () => {
    function emittingPlugin(base: Base, options: Base.Options) {
      const instance = withEventEmitterPlugin(base, options);
      async function emitNumber(n: number) {
        await instance.eventEmitter.emit('myEvent', n);
      }
      const props: { storedNumber?: number; emitNumber: (n: number) => void } = {
        emitNumber
      };
      return props;
    }

    function withEmittingPlugin<T>(
      base: T,
      options: Base.Options
    ): T & { storedNumber?: number; emitNumber: (n: number) => void } {
      return Object.assign(base, emittingPlugin(base as unknown as Base, options));
    }

    function observingPlugin(base: Base, options: Base.Options) {
      const instance = withEmittingPlugin(withEventEmitterPlugin(base, options), options);
      instance.eventEmitter.on('myEvent', (n: number) => {
        instance.storedNumber = n;
      });
    }

    const Yoda = Base.withPlugins([eventEmitterPlugin, emittingPlugin, observingPlugin]).withDefaults({});
    const instance = new Yoda();
    const emitSpy = jest.spyOn(instance.eventEmitter, 'emit');
    expect(instance.storedNumber).toBeUndefined();
    await instance.emitNumber(19);
    expect(emitSpy).toHaveBeenCalled();
    expect(instance.storedNumber).toBe(19);
  });

  it("should expose Emmittery's debug options", () => {
    const options: Base.Options = {
      eventEmitterDebug: {
        name: 'foo',
        enabled: true,
        logger: () => undefined
      }
    };
    const Yoda = Base.withPlugins([eventEmitterPlugin]).withDefaults(options);
    const instance = new Yoda();
    expect(instance.options).toEqual(options);
  });
});
