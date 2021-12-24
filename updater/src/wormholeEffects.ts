import { readFile } from "fs/promises";
import { parse as parseYaml } from "yaml";
import config from "./config";
import writeData from "./filesystem/writeData";

const parseEffects = (traits: any) =>
  traits.miscBonuses.map(({ bonus, bonusText, isPositive }: any) => {
    const desc = bonusText.en;
    const description = desc[0].toUpperCase() + desc.slice(1);

    return {
      strength: isPositive ? bonus : bonus * -1,
      description,
    };
  });

export default async (): Promise<void> => {
  const effectsYaml = await readFile("assets/wormholeEffects.yaml", {
    encoding: "utf8",
  });

  const effectsRaw: any = parseYaml(effectsYaml);

  const effects = Object.entries(effectsRaw).reduce(
    (acc: any, [key, val]: any) => {
      acc[key] = {
        id: key,
        name: val.name.en.replace(/ Effects$/, ""),
        effects: parseEffects(val.traits),
      };
      return acc;
    },
    {}
  );

  await writeData(config.dataFiles.wormholeEffects.name, effects);
};
