import { jest } from '@jest/globals';
import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import { eventEmitterPlugin, withEventEmitter } from '../src/';
import Emittery from 'emittery';
// import { IEventEmitter } from '../src/types';

describe('The event emitter plugin', () => {
  it('provides all the methods of the Emittery package', () => {
    const Yoda = Base.withPlugins([eventEmitterPlugin]).withDefaults({});
    const instance = new Yoda();
    const emitteryMethods = Object.getOwnPropertyNames(Emittery.prototype).filter((v) => v !== 'constructor');
    const eventEmitterMethods = Object.getOwnPropertyNames(instance.eventEmitter);
    expect(eventEmitterMethods).toEqual(expect.arrayContaining(emitteryMethods));
  });

  it('enables cross plugins communication', async () => {
    function emittingPlugin(base: Base, options: Base.Options) {
      const instance = withEventEmitter(base, options);
      async function emitNumber(n: number) {
        await instance.eventEmitter.emit('number', n);
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
      const instance = withEmittingPlugin(withEventEmitter(base, options), options);
      instance.eventEmitter.on('number', (n: number) => {
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
});
