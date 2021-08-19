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
    await rm(tempFile);
    await rm(targetDir);
  } catch {}

  await mkdir(targetDir);
};
