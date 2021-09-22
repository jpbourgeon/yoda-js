/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/naming-convention */
import { Base } from 'javascript-plugin-architecture-with-typescript-definitions';
// import Emittery from 'emittery';

// // Source: https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern
// function applyMixins(derivedCtor: any, constructors: any[]): any {
//   constructors.forEach((baseCtor) => {
//     Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
//       Object.defineProperty(
//         derivedCtor.prototype,
//         name,
//         Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
//       );
//     });
//   });
// }

const Yoda = Base;
export default Yoda;
