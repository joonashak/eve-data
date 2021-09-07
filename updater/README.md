# Static Data Assets

Rudimentary tool to generate the static data required by Holenav from EVE Static Data Export (SDE).

## Usage

```bash
npm run update
```

To use arguments, add `--` and your arguments, e.g., `npm run update -- -d`. To see the list of possible arguments, run `npm run update -- --help`.

## Caveats

- `typeIDs.yaml` is incorrectly formatted. So far, I have simply manually copied stuff from it to `assets/`.
