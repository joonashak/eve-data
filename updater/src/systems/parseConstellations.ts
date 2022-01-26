import { opendir, readFile } from "fs/promises";
import { resolve } from "path";
import { parse as parseYaml } from "yaml";
import getNameById from "../invNames/getNameById";
import { Region } from "./parseRegions";

export type Constellation = {
  id: number;
  name: string;
  path: string;
  region: Region;
};

const parseConstellations = async (
  region: Region
): Promise<Constellation[]> => {
  const constellations: Constellation[] = [];
  const regionDir = await opendir(region.path);

  for await (const regionEntry of regionDir) {
    if (!regionEntry.isDirectory()) {
      continue;
    }

    const constellationPath = resolve(regionDir.path, regionEntry.name);
    const constellationFilePath = resolve(
      constellationPath,
      "constellation.staticdata"
    );
    const constellationYaml = await readFile(constellationFilePath, {
      encoding: "utf8",
    });
    const constellationData = parseYaml(constellationYaml);
    const { constellationID } = constellationData;

    const constellation = {
      id: constellationID,
      name: getNameById(constellationID),
      path: constellationPath,
      region,
    };
    constellations.push(constellation);
  }

  return constellations;
};

export default parseConstellations;
