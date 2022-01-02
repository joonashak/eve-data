# CHANGELOG

## v2.1.0 (2022-01-02)

- Remove wormhole system class prefix from `effect.name` strings.
- Add wormhole system class as `effect.whClass` (number).

### Before

```typescript
{
  ...,
  name: "Class 2 Pulsar",
  ...,
}
```

### After

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
