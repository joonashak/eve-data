import { opendir, readFile } from "fs/promises";
import { resolve } from "path";
import { parse as parseYaml } from "yaml";
import getNameById from "../invNames/getNameById";
import { Constellation } from "./parseConstellations";

type System = {
  id: string;
  name: string;
  constellation: Constellation;
};

const parseSystems = async (
  constellation: Constellation
): Promise<System[]> => {
  const systems: System[] = [];
  const constellationDir = await opendir(constellation.path);

  for await (const constellationEntry of constellationDir) {
    if (!constellationEntry.isDirectory()) {
      continue;
    }

    const systemFilePath = resolve(
      constellationDir.path,
      constellationEntry.name,
      "solarsystem.staticdata"
    );
    const systemYaml = await readFile(systemFilePath, {
      encoding: "utf8",
    });
    const systemData = parseYaml(systemYaml);
    const { solarSystemID } = systemData;

    const system = {
      id: solarSystemID,
      name: getNameById(solarSystemID),
      constellation,
    };
    systems.push(system);
  }

  return systems;
};

export default parseSystems;
