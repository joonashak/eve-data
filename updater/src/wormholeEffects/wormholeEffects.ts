import { readFile } from "fs/promises";
import { parse as parseYaml } from "yaml";
import config from "../config";
import writeData from "../filesystem/writeData";
import getEffectDescription from "./getEffectDescription";
import getSignedStrength from "./getSignedStrength";

const parseTraits = (traits: any) =>
  traits.miscBonuses.map(({ bonus, bonusText, isPositive }: any) => {
    const desc = bonusText.en;

    return {
      strength: getSignedStrength(bonus, desc),
      isPositive,
      description: getEffectDescription(desc),
    };
  });

export default async (): Promise<any> => {
  const effectsYaml = await readFile("assets/wormholeEffects.yaml", {
    encoding: "utf8",
  });

  const effectsRaw: any = parseYaml(effectsYaml);

  const effects = Object.entries(effectsRaw).reduce(
    (acc: any, [key, val]: any) => {
      const effectClass = Number(val.name.en.match(/[1-6]/));
      const name = val.name.en
        .replace(/ Effects$/, "")
        .replace(/^Class [1-6] /, "");
      acc[key] = {
        id: key,
        name,
        effectClass,
        traits: parseTraits(val.traits),
      };
      return acc;
    },
    {}
  );

  await writeData(config.dataFiles.wormholeEffects.name, effects);
  return effects;
};
