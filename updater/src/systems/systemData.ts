import { opendir, readFile } from "fs/promises";
import { resolve } from "path";
import { parse as parseYaml } from "yaml";
import config from "../config";
import writeData from "../filesystem/writeData";
import getNameById from "../invNames/getNameById";
import formatSystems from "./formatSystems";

/**
 * Traverse the given directory recursively and return a list of planetary system data
 * found therein.
 */
const traverseRegion = async (
  path: string,
  region: { id: number; name: string },
  whClass: number | null,
  systems: any[] = []
) => {
  const dir = await opendir(path);

  // Then traverse the directory recursively.
  for await (const dirent of dir) {
    const direntPath = resolve(dir.path, dirent.name);

    if (dirent.isDirectory()) {
      await traverseRegion(direntPath, region, whClass, systems);
    }

    if (dirent.name === "solarsystem.staticdata") {
      //console.log("solarsystem");
      const content = parseYaml(
        await readFile(direntPath, { encoding: "utf8" })
      );
      systems.push({ ...content, region, whClass });
    }
  }

  return systems;
};

/**
 * Create planetary system data by traversing the universe region-by-region.
 */
const traverseUniverse = async (path: string): Promise<any> => {
  const systems = [];
  const dir = await opendir(path);

  for await (const dirent of dir) {
    if (!dirent.isDirectory()) {
      continue;
    }

    const regionDirPath = resolve(dir.path, dirent.name);
    const regionDir = await opendir(regionDirPath);

    for await (const regionFile of regionDir) {
      if (regionFile.name === "region.staticdata") {
        const regionYaml = await readFile(
          resolve(regionDir.path, regionFile.name),
          {
            encoding: "utf8",
          }
        );
        const regionData = parseYaml(regionYaml);
        const { regionID, wormholeClassID } = regionData;
        const region = { id: regionID, name: getNameById(regionID) };
        systems.push(
          ...(await traverseRegion(regionDir.path, region, wormholeClassID))
        );
      }
    }
  }

  return systems;
};

/**
 * Get data for all planetary systems in SDE.
 */
export default async (): Promise<void> => {
  const kSpaceSystems = await traverseUniverse("sde/fsd/universe/eve");
  const wSpaceSystems = await traverseUniverse("sde/fsd/universe/wormhole");
  const systemsRaw = kSpaceSystems.concat(wSpaceSystems);
  const systems = await formatSystems(systemsRaw);
  await writeData(config.dataFiles.systems.name, systems);
};
