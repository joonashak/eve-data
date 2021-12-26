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
   * Effect for non-vanilla wormhole systems, `null` for others.
   */
  effect: WormholeEffect | null;

  /**
   * Region ESI ID.
   */
  regionId: number;

  /**
   * Class (1-6) for wormhole systems, `null` for others.
   */
  whClass: 1 | 2 | 3 | 4 | 5 | 6 | null;
};

export type WormholeEffect = {
  /**
   * Effect ID from SDE.
   */
  id: number;

  /**
   * Effect name including system class.
   */
  name: string;

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
