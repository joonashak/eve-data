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
  path: string;
  whClass: number | null;
};

const getRegions = async (
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

    const region = {
      id: regionID,
      name: getNameById(regionID),
      path: regionPath,
      whClass: isAnoikis ? wormholeClassID : null,
    };
    regions.push(region);
  }

  return regions;
};

type Constellation = {
  id: number;
  name: string;
  path: string;
  region: Region;
};

const getConstellations = async (region: Region): Promise<Constellation[]> => {
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

type System = {
  id: string;
  name: string;
  constellation: Constellation;
};

const getSystems = async (constellation: Constellation): Promise<System[]> => {
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

/**
 * Get data for all planetary systems in SDE.
 */
export default async (): Promise<void> => {
  const kSpaceRegions = await getRegions("sde/fsd/universe/eve", false);
  const anoikisRegions = await getRegions("sde/fsd/universe/wormhole", true);
  const regions = kSpaceRegions.concat(anoikisRegions);
  const constellations = (
    await Promise.all(regions.map(getConstellations))
  ).flat();
  //console.log(constellations);
  //console.log(regions);
  //console.log(await getConstellations(regions[0]));
  //console.log(await getSystems(constellations[0]));
  const systems = (await Promise.all(constellations.map(getSystems))).flat();
  console.log(systems);

  // const systems = await formatSystems(systemsRaw);
  // await writeData(config.dataFiles.systems.name, systems);
};
