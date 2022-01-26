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

  const systemsRaw = (
    await Promise.all(constellations.map(parseSystems))
  ).flat();

  const systems = await formatSystems(systemsRaw);
  await writeData(config.dataFiles.systems.name, systems);
};
