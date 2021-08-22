import systems from "../assets/systems.json";

type System = {
  /**
   * Full system name as it appears in the game.
   */
  name: string;
  /**
   * System ESI ID.
   */
  id: number;
  /**
   * Exact security status.
   */
  securityStatus: number;
  // TODO: Improve securityClass type.
  /**
   * Security classification.
   */
  securityClass: string;
  /**
   * Effect id for wormhole systems, `null` for others.
   */
  effectId: number | null;
  /**
   * Region ESI ID.
   */
  regionId: number;
  // TODO: Improve whClass type.
  /**
   * Class (1-6) for wormhole systems, `null` for others.
   */
  whClass: number | null;
};

/**
 * Data for all star systems in the game.
 * @returns {System[]} Star system data objects.
 */
export const getSystems = (): System[] => systems;
