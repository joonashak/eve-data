# `@eve-data/systems`

Static data for all EVE Online star systems. The data is sourced from EVE Static Data Export (SDE) but offered via a custom API.

This library can be used in browsers as well as with Node. The data gzips well which offers a viable alternative for fetching static data from an API.

## The `@eve-data` project

This library is a part of the [`@eve-data` project](https://github.com/joonashak/eve-data), please see the [README](https://github.com/joonashak/eve-data#readme) for more information.

## Usage

### All data

```typescript
import systems from "@eve-data/systems";

console.log(systems);
// [
//     {
//         "name": "TXW-EI",
//         "id": 30003323,
//         "securityStatus": -0.01311255977769577,
//         "securityClass": "NULL",
//         "effectId": null,
//         "regionId": 10000041,
//         "whClass": null
//     },
//     ...
// ]
```

### One system

Find one system with name or ESI ID.

```typescript
import { findOneSystem } from "@eve-data/systems";

// Use exact name as displayed in game.
const jita = findOneSystem({ name: "Jita" });

// Throws if system not found.
try {
  findOneSystem({ id: 1234567 });
} catch {
  console.log("Not found!");
}
```

## License

Project code is licensed under MIT, game data is subject to CCP's EULA.
