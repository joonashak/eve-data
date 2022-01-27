import drifterWhSystems from "../../assets/drifterWhSystems";
import wormholeStatics from "../../assets/wormholeStatics";
import { HolenavSystem } from "../types/holenavStaticDataTypes";
import wormholeEffects from "../wormholeEffects/wormholeEffects";
import { Constellation } from "./parseConstellations";
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

const getWhClass = (name: string, region: Region): number | null => {
  if (Object.keys(drifterWhSystems).includes(name)) {
    return drifterWhSystems[name as keyof typeof drifterWhSystems].whClass;
  }
  return region.whClass;
};

const getSecondaryName = (name: string): string | null => {
  if (Object.keys(drifterWhSystems).includes(name)) {
    return drifterWhSystems[name as keyof typeof drifterWhSystems]
      .secondaryName;
  }
  return null;
};

const formatRegion = ({ id, name }: Region) => ({ id, name });
const formatConstellation = ({ id, name }: Constellation) => ({ id, name });

const formatSystems = async (systems: System[]): Promise<HolenavSystem[]> => {
  const effects = await wormholeEffects();

  return systems.map((system) => {
    const { id, name, securityStatus, secondarySun, constellation } = system;
    const { region } = constellation;
    const whClass = getWhClass(name, region);
    const securityClass = getSecurityClass(securityStatus, whClass);
    const effectId = secondarySun?.effectBeaconTypeID || null;
    const effect = effectId ? effects[effectId.toString()] : null;
    const secondaryName = getSecondaryName(name);

    return {
      name,
      secondaryName,
      id,
      securityStatus,
      securityClass,
      effect,
      region: formatRegion(region),
      constellation: formatConstellation(constellation),
      whClass,
      staticConnections: getStatics(name),
    };
  });
};

export default formatSystems;
