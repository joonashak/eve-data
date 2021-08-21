import systems from "../assets/systems.json";

export const getSystems = () => systems;

export const getSystemNames = () => systems.map((s) => s.name);
