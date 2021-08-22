export type System = {
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
  /**
   * Security classification.
   */
  securityClass: "NULL" | "WH" | "HIGH" | "LOW";
  /**
   * Effect id for wormhole systems, `null` for others.
   */
  effectId: number | null;
  /**
   * Region ESI ID.
   */
  regionId: number;
  /**
   * Class (1-6) for wormhole systems, `null` for others.
   */
  whClass: 1 | 2 | 3 | 4 | 5 | 6 | null;
};
