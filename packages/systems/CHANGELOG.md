# CHANGELOG

## v3.0.0 (2022-01-27)

### Breaking Changes

- Added classes 14-18 to `System.whClass` type.
- Removed class 25 (Pochven) from `System.whClass` type as Pochven is not a wormhole region and Pochven systems can be identified using `System.region`.
- Removed deprecated `regionId` property as duplicate of `region.id`.
- Renamed `System.effect.whClass` property to `effectClass` to avoid confusion with `System.whClass`.

### Additions

- Added drifter wormhole informal names (Conflux, Vidette, etc.) as `secondaryName`.
- Added constellation data as `constellation`.

### Fixes

- Added missing static connections to Thera.
- Fixed drifter wormhole classes to be 14-18 (all were previously class 1 as in SDE).

## v2.2.2 (2022-01-27)

### Fixes

- Fixed some nullsec system having `"WH"` as their `securityClass`.
- Removed `whClass` number from those nullsec systems that have it set in the SDE.

## v2.2.1 (2022-01-23)

### Additions

- Add `region` object with region names as `region.name`. (The property `regionId` is now a redundant duplicate and `region.id` should be used instead. `regionId` will be removed in `v3`.)

## v2.2.0 (2022-01-22)

### Additions

- Add wormhole systems' static connections as `staticConnections`.

## v2.1.2 (2022-01-21)

### Fixes

- Add missing wormhole classes and export types ([PR #2](https://github.com/joonashak/eve-data/pull/2)).
- Add missing license files.

## v2.1.1 (2022-01-02)

### Fixes

- Add missing type for `effect.whClass`.

## v2.1.0 (2022-01-02)

### Changes

- Remove wormhole system class prefix from `effect.name` strings.
- Add wormhole system class as `effect.whClass` (number).

#### Before

```typescript
{
  ...,
  name: "Class 2 Pulsar",
  ...,
}
```

#### After

```typescript
{
  ...,
  name: "Pulsar",
  whClass: 2,
  ...,
}
```

## v2.0.0 (2021-12-27)

### Breaking Changes

- Replace `system.effectId` number with `system.effect` object detailing the effect type and its traits. To migrate, replace `effectId` references with `effect.id`.

### Other Changes

- Begin keeping changelog.
