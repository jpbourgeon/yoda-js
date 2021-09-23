//@ts-expect-error: https://stackoverflow.com/questions/57262334/ts-jest-typescript-diagnostic-error-ts2307-cannot-find-module#61161815
import { jest } from '@jest/globals';
import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
import emitteryPlugin from '../';

const Yoda = Base.withPlugins([emitteryPlugin]).withDefaults({});

describe('The event emitter plugin', () => {
  it('contains all the methods and properties of the Emittery package', () => undefined);
  it('enables cross plugins communication', () => {
    const instance = new Yoda();
    const eventEmitter = instance.eventEmitter;
    const onSpy = jest.spyOn(eventEmitter, 'on');
    const emitSpy = jest.spyOn(eventEmitter, 'emit');

    eventEmitter.on('event', (data: string) => console.log(data));
    eventEmitter.emit('event', 'Hello world!');

    expect(onSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });
});
