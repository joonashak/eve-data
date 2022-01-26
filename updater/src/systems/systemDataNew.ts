import { opendir, readFile } from "fs/promises";
import { resolve } from "path";
import { parse as parseYaml } from "yaml";
import config from "../config";
import writeData from "../filesystem/writeData";
import getNameById from "../invNames/getNameById";
import formatSystems from "./formatSystems";

type Region = {
  id: number;
  name: string;
  whClass: number | null;
};

const getRegions = async (
  path: string,
  isAnoikis: boolean
): Promise<Region[]> => {
  const systems: Region[] = [];
  const dir = await opendir(path);

  for await (const dirent of dir) {
    if (!dirent.isDirectory()) {
      continue;
    }

    const regionFilePath = resolve(dir.path, dirent.name, "region.staticdata");
    const regionYaml = await readFile(regionFilePath, { encoding: "utf8" });
    const regionData = parseYaml(regionYaml);
    const { regionID, wormholeClassID } = regionData;
    const region = {
      id: regionID,
      name: getNameById(regionID),
      whClass: isAnoikis ? wormholeClassID : null,
    };
    systems.push(region);
  }

  return systems;
};

/**
 * Get data for all planetary systems in SDE.
 */
export default async (): Promise<void> => {
  const kSpaceRegions = await getRegions("sde/fsd/universe/eve", false);
  const anoikisRegions = await getRegions("sde/fsd/universe/wormhole", true);
  const regions = kSpaceRegions.concat(anoikisRegions);
  console.log(regions);

  // const systems = await formatSystems(systemsRaw);
  // await writeData(config.dataFiles.systems.name, systems);
};
