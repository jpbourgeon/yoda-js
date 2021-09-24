// @ts-expect-error: jest globals are unreachable
import { jest } from '@jest/globals';
import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import Emittery from 'emittery';
import eventEmitterPlugin from '../src/';

describe('The event emitter plugin', () => {
  it('provides all the methods of the Emittery package', () => {
    const Yoda = Base.withPlugins([eventEmitterPlugin]).withDefaults({});
    const instance = new Yoda();
    const emitteryMethods = Object.getOwnPropertyNames(Emittery.prototype).filter((v) => v !== 'constructor');
    const eventEmitterMethods = Object.getOwnPropertyNames(instance.eventEmitter).filter((v) => v !== 'constructor');
    expect(eventEmitterMethods).toEqual(expect.arrayContaining(emitteryMethods));
  });

  it('enables cross plugins communication', async () => {
    function emittingPlugin() {
      async function emitNumber(n: number) {
        await this.eventEmitter.emit('number', n);
      }
      return { emitNumber };
    }

    function observingPlugin(base: Base) {
      // @ts-expect-error: TODO
      base.eventEmitter.on('number', (n: number) => {
        // @ts-expect-error: TODO
        base.storedNumber = n;
      });
    }

    const Yoda = Base.withPlugins([eventEmitterPlugin, emittingPlugin, observingPlugin]).withDefaults({});
    const instance = new Yoda();
    const emitSpy = jest.spyOn(instance.eventEmitter, 'emit');

    expect(instance.storedNumber).toBeUndefined();
    await instance.emitNumber(1);
    expect(emitSpy).toHaveBeenCalled();
    expect(instance.storedNumber).toBe(1);
  });
});
