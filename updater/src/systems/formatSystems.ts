import { HolenavSystem } from "../types/holenavStaticDataTypes";
import { SdeSystemExtended } from "../types/sdeTypes";
import wormholeEffects from "../wormholeEffects/wormholeEffects";

enum SecurityClass {
  High = "HIGH",
  Low = "LOW",
  Null = "NULL",
  Wormhole = "WH",
}

const securityClassFromStatus = (securityStatus: number) => {
  const roundedSec = Number(securityStatus.toFixed(1));

  if (roundedSec >= 0.5) {
    return SecurityClass.High;
  }
  if (securityStatus > 0) {
    return SecurityClass.Low;
  }
  if (securityStatus > -0.99) {
    return SecurityClass.Null;
  }
  return SecurityClass.Wormhole;
};

export default async (
  systems: SdeSystemExtended[],
  systemNames: any
): Promise<HolenavSystem[]> => {
  const effects = await wormholeEffects();

  return systems.map((system) => {
    const { solarSystemID, security, secondarySun, regionId, whClass } = system;
    const name = systemNames[solarSystemID];
    const securityClass = securityClassFromStatus(security);
    const effectId = secondarySun?.effectBeaconTypeID || null;
    const effect = effectId ? effects[effectId.toString()] : null;

    return {
      name,
      id: solarSystemID,
      securityStatus: security,
      securityClass,
      effect,
      regionId,
      // Some k-space systems have a wh class set in SDE...
      whClass: securityClass === SecurityClass.Wormhole ? whClass : null,
    };
  });
};
