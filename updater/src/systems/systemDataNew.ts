import config from "../config";
import writeData from "../filesystem/writeData";
import formatSystems from "./formatSystems";
import parseConstellations from "./parseConstellations";
import parseRegions from "./parseRegions";
import parseSystems from "./parseSystems";

/**
 * Get data for all planetary systems in SDE.
 */
export default async (): Promise<void> => {
  const kSpaceRegions = await parseRegions("sde/fsd/universe/eve", false);
  const anoikisRegions = await parseRegions("sde/fsd/universe/wormhole", true);
  const regions = kSpaceRegions.concat(anoikisRegions);
  const constellations = (
    await Promise.all(regions.map(parseConstellations))
  ).flat();
  //console.log(constellations);
  //console.log(regions);
  //console.log(await getConstellations(regions[0]));
  //console.log(await getSystems(constellations[0]));
  const systems = (await Promise.all(constellations.map(parseSystems))).flat();
  console.log(systems);

  // const systems = await formatSystems(systemsRaw);
  // await writeData(config.dataFiles.systems.name, systems);
};
