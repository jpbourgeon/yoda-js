/* eslint-disable @typescript-eslint/no-namespace */
import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';

declare module 'javascript-plugin-architecture-with-typescript-definitions' {
  namespace Base {
    interface Options {
      name?: string;
    }
  }
}

function helloPlugin(
  _base: Base,
  options: Base.Options
): {
  hello: () => void;
} {
  return {
    hello() {
      console.log(`Hello ${options.name}!`);
    }
  };
}

describe('Yoda core', () => {
  it('is', () => {
    const Yoda = Base.withPlugins([helloPlugin]).withDefaults({
      name: 'World'
    });

    const instance = new Yoda({ name: 'World' });

    instance.hello();

    expect(true).toBeTruthy();
    // expect({ a: 1, b: 2, c: 3 }).toMatchSnapshot();
  });
});
