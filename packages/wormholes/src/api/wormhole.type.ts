export type SystemType = {
  type: "HIGH" | "LOW" | "NULL" | "WH" | "TRIG" | "THERA";
  whClass: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | null;
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
