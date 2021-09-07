import { readFile } from "fs/promises";
import { parse as parseYaml } from "yaml";
import config from "./config";
import writeData from "./filesystem/writeData";

export default async (): Promise<void> => {
  const effectsYaml = await readFile("assets/wormholeEffects.yaml", {
    encoding: "utf8",
  });

  const effectsRaw: any = parseYaml(effectsYaml);

  const effects = Object.entries(effectsRaw).reduce(
    (acc: any, [key, val]: any) => {
      acc[key] = val.name.en;
      return acc;
    },
    {}
  );

  await writeData(config.dataFiles.wormholeEffects.name, effects);
};
