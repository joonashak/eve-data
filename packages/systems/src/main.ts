import systemsData from "../assets/systems.json";
import findOneSystemApi from "./api/findOneSystem";
import { System } from "./api/system.type";

const systems: System[] = systemsData;

/**
 * Data for all star systems in the game.
 */
export default systems;

export const findOneSystem = findOneSystemApi;
