import { writeFile } from "fs/promises";
import { join } from "path";
import config from "../config";

const { targetDir } = config;

/**
 * Serialize and write given data to JSON and binary files.
 */
export default async (name: string, data: any) => {
  const path = join(targetDir, name).concat(".json");
  const jsonStr = JSON.stringify(data, null, 4);
  await writeFile(path, jsonStr);
};
