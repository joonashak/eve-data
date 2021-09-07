export type SystemType = {
  // FIXME: This does not work?!
  // type: "HIGH" | "LOW" | "NULL" | "WH" | "TRIG" | "THERA";
  type: string | "HIGH" | "LOW" | "NULL" | "WH" | "TRIG" | "THERA";
  whClass: number | null;
};

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
   * Destination system type.
   */
  destination: SystemType;
  /**
   * Types of systems where this wormhole can originate from.
   */
  origins: SystemType[];
  /**
   * Mass properties.
   */
  mass: {
    total: number;
    jump: number;
  };
};
