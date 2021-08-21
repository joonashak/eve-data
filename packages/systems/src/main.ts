import { decode } from "@msgpack/msgpack";
import { readFileSync } from "fs";
import path from "path";

const file = readFileSync(path.join(__dirname, "../assets/systems.dat"));
const systems: any = decode(file);
console.log(process.env.NODE_ENV);

export const getSystems = () => systems;
