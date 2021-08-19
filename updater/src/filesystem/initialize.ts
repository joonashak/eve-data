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

  const rf = { recursive: true, force: true };

  try {
    await rm(tempFile, rf);
    await rm(targetDir, rf);
  } catch {}

  await mkdir(targetDir);
};
