/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-explicit-any */
import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';

declare module 'javascript-plugin-architecture-with-typescript-definitions' {
  namespace Base {
    interface Options {
      myPluginOption?: string;
    }
  }
}

export default function myPlugin(_base: Base, options: Base.Options): any {
  return {
    myPluginOption: options.myPluginOption || 'baz'
  };
}
