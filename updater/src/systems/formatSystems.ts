import wormholeStatics from "../../assets/wormholeStatics";
import { HolenavSystem } from "../types/holenavStaticDataTypes";
import wormholeEffects from "../wormholeEffects/wormholeEffects";
import { Region } from "./parseRegions";
import { System } from "./parseSystems";

enum SecurityClass {
  High = "HIGH",
  Low = "LOW",
  Null = "NULL",
  Wormhole = "WH",
}

const getSecurityClass = (securityStatus: number, whClass: number | null) => {
  if (whClass) {
    return SecurityClass.Wormhole;
  }

  const roundedSec = Number(securityStatus.toFixed(1));

  if (roundedSec >= 0.5) {
    return SecurityClass.High;
  }
  if (securityStatus > 0) {
    return SecurityClass.Low;
  }

  return SecurityClass.Null;
};

const getStatics = (name: string): string[] => {
  if (Object.keys(wormholeStatics).includes(name)) {
    return wormholeStatics[name as keyof typeof wormholeStatics];
  }
  return [];
};

const formatRegion = ({ id, name }: Region) => ({ id, name });

// TODO: Check C13 systems.
// TODO: Handle special wh systems.
// TODO: Add constellation data.
const formatSystems = async (systems: System[]): Promise<HolenavSystem[]> => {
  const effects = await wormholeEffects();

  return systems.map((system) => {
    const { id, name, securityStatus, secondarySun, constellation } = system;
    const { region } = constellation;
    const { whClass } = region;
    const securityClass = getSecurityClass(securityStatus, whClass);
    const effectId = secondarySun?.effectBeaconTypeID || null;
    const effect = effectId ? effects[effectId.toString()] : null;

    return {
      name,
      id,
      securityStatus,
      securityClass,
      effect,
      // FIXME: This should be deprecated in v3.
      regionId: region.id,
      region: formatRegion(region),
      whClass,
      staticConnections: getStatics(name),
    };
  });
};

export default formatSystems;
