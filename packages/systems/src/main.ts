import systems from "../assets/systems.json";

type System = {
  name: string;
  id: number;
  securityStatus: number;
  securityClass: string;
  effectId: number | null;
  regionId: number;
  whClass: number | null;
};

export const getSystems = (): System[] => systems;
