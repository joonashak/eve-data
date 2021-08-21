import { rm, mkdir } from "fs/promises";
import config from "../config";

/**
 * Clean up possibly existing files and create directories for new ones.
 */
export default async () => {
  const {
    targetDir,
    sde: { tempFile },
  } = config;

  try {
    await rmrf(tempFile);
    await rmrf(targetDir);
  } catch {}

  await mkdir(targetDir);
};

export const rmrf = async (path: string) => {
  const rf = { recursive: true, force: true };
  await rm(path, rf);
};
