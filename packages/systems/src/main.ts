import systems from "../assets/systems.json";

type System = {
  name: string;
  systemEsiId: string;
  securityStatus: number;
  securityClass: string;
  effectId: string | null;
  regionId: string;
  whClass: string | null;
};

export const getSystems = (): System[] => systems;
