export type Wormhole = {
  /**
   * Wormhole type.
   */
  type: string;
  /**
   * Average lifetime in hours.
   */
  lifetimeHrs: number;
  /**
   * Destination system.
   */
  destination: {
    type: "HIGH" | "LOW" | "NULL" | "WH" | "TRIG" | "THERA";
    whClass: number | null;
  };
  /**
   * Mass properties.
   */
  mass: {
    total: number;
    jump: number;
  };
};
