# @yoda-js/event-emitter-plugin

This plugin brings events management capabilities to Yoda.

It adds the properties and methods of the [Emittery](https://github.com/sindresorhus/emittery) Event Emitter package, to Yoda base class, with full TypeScript support.

## Usage

Type your custom events by declaring them into the plugin architecture module.  
More about typing your events: <https://github.com/sindresorhus/emittery#typescript>

```js
declare module 'javascript-plugin-architecture-with-typescript-definitions' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Base {
    interface EventData {
      myEvent: any;
    }
  }
}
```

Add the plugin to the plugin-architecture base class. You can configure Emittery in the options.  
More on the options: <https://github.com/sindresorhus/emittery#options>
```js
const Yoda = Base.withPlugins([eventEmitterPlugin]).withDefaults({
  eventEmitterDebug: {
    name: 'foo',
    enabled: true,
    logger: () => undefined
  }
});
```

You can compose and use the event emitter into another plugin with the utility function.  
```js
function anotherPlugin(base: Base, options: Base.Options) {
  const instance = withEventEmitterPlugin(base, options);
  //...
}
```