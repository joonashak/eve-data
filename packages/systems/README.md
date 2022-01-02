# `@eve-data/systems`

Static data for all EVE Online star systems. The data is sourced from EVE Static Data Export (SDE) but offered via a custom API.

This library can be used in browsers as well as with Node. The data gzips well which offers a viable alternative for fetching static data from an API during runtime (less than 150 KB gzipped).

## The `@eve-data` project

This library is a part of the [`@eve-data` project](https://github.com/joonashak/eve-data), please see the top-level [README](https://github.com/joonashak/eve-data#readme) for more general information.

## Usage

```bash
npm i @eve-data/systems
```

### All Data

```typescript
import systems from "@eve-data/systems";

console.log(systems);
// [
//     {
//         "name": "TXW-EI",
//         "id": 30003323,
//         "securityStatus": -0.01311255977769577,
//         "securityClass": "NULL",
//         "effect": null,
//         "regionId": 10000041,
//         "whClass": null
//     },
//     ...
// ]
```

### Find One System

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

### Wormhole Effects

Wormhole effects are included for non-vanilla systems.

The `strength` values are signed to make them more sensible. The signs reflect the effect particular trait will have on an attribute of a ship or a module. This should be rather straightforward in all except the agility/inertia case (part of the Black Hole effect): The SDE's description talks about "ship agility", however, there is no such an attribute in the game. The correct attribute here is _ship inertia_ which has the opposite sign to "agility". Therefore I have left the `strength` value positive as the effect increases ship inertia. The long description is left as is ("Penalty to ship agility") but the short one is "Ship Inertia".

The `isPositive` booleans come straight from the SDE and appear to indicate whether the particular trait is considered beneficial to capsuleers or not. They might be slightly ambiguous at times but are often used to color the traits in UI's so I wanted to include them.

```typescript
const wh = findOneSystem({ name: "J211817" });

console.log(wh.effect);
//        {
//            "id": "30867",
//            "name": "Pulsar",
//            "whClass": 4,
//            "traits": [
//                {
//                    "strength": -36,
//                    "isPositive": true,
//                    "description": {
//                        "long": "Reduction in capacitor recharge time",
//                        "short": "Capacitor Recharge Time"
//                    }
//                },
//                ...
//            ]
//        },
```

## License

Project code is licensed under MIT, game data is subject to CCP's EULA.
