import { opendir, readFile } from "fs/promises";
import { resolve } from "path";
import { parse as parseYaml } from "yaml";
import jovianRegions from "../../assets/jovianRegions";
import getNameById from "../invNames/getNameById";

export type Region = {
  id: number;
  name: string;
  path: string;
  whClass: number | null;
};

const parseRegions = async (
  path: string,
  isAnoikis: boolean
): Promise<Region[]> => {
  const regions: Region[] = [];
  const dir = await opendir(path);

  for await (const dirent of dir) {
    if (!dirent.isDirectory()) {
      continue;
    }

    const regionPath = resolve(dir.path, dirent.name);
    const regionFilePath = resolve(regionPath, "region.staticdata");
    const regionYaml = await readFile(regionFilePath, { encoding: "utf8" });
    const regionData = parseYaml(regionYaml);
    const { regionID, wormholeClassID } = regionData;
    const name = getNameById(regionID);

    // Ignore inaccesible Jovian regions.
    if (jovianRegions.includes(name)) {
      continue;
    }

    const region = {
      id: regionID,
      name,
      path: regionPath,
      whClass: isAnoikis ? wormholeClassID : null,
    };
    regions.push(region);
  }

  return regions;
};

export default parseRegions;
