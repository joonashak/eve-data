export type System = {
  /**
   * Full system name as it appears in the game.
   */
  name: string;

  /**
   * Informal name for drifter wormhole systems (Vidette, Conflux, etc.).
   */
  secondaryName: string | null;

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
   * Effect for non-vanilla wormhole systems, `null` for others.
   */
  effect: WormholeEffect | null;

  /**
   * Region information.
   */
  region: {
    /**
     * Region ESI ID.
     */
    id: number;

    /**
     * Region name.
     */
    name: string;
  };

  /**
   * Constellation information.
   */
  constellation: {
    /**
     * Constellation ESI ID.
     */
    id: number;

    /**
     * Constellation name.
     */
    name: string;
  };

  /**
   * Wormhole class.
   * - 1-6 for standard wormhole systems.
   * - 12 for Thera.
   * - 13 for small-ship shattered systems.
   * - 14-18 for drifter wormhole systems.
   * - `null` for others.
   */
  whClass: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | null;

  /**
   * Static connections of a wormhole system.
   * Strings are four-character wormhole codes, e.g., "B274".
   */
  staticConnections: string[];
};

export type WormholeEffect = {
  /**
   * Effect ID from SDE.
   */
  id: number;

  /**
   * Effect name.
   */
  name: string;

  /**
   * Effect class (1-6).
   */
  effectClass: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * List of the effect's traits, that is, the actual effects on your ship.
   */
  traits: WormholeEffectTrait[];
};

export type WormholeEffectTrait = {
  /**
   * Trait strength percentage, signed.
   */
  strength: number;

  /**
   * Whether this trait is considered positive to the player or not.
   */
  isPositive: boolean;

  /**
   * Trait descriptions.
   */
  description: {
    /**
     * Description from SDE.
     */
    long: string;

    /**
     * Terse description written by me :)
     */
    short: string;
  };
};
