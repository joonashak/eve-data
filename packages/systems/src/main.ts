import { decode } from "@msgpack/msgpack";
import { readFileSync } from "fs";

const file = readFileSync("./assets/systems.dat");
const systems: any = decode(file);

export const getSystems = () => systems;
