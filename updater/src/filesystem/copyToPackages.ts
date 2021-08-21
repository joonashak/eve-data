import { copyFile, mkdir } from "fs/promises";
import path from "path";
import config from "../config";
import { rmrf } from "./initialize";

/**
 * Copy data files to target directories.
 */
export default async () => {
  const { dataFiles, targetDir } = config;

  for (const file of Object.values(dataFiles)) {
    const { name, targets } = file;
    const src = path.join(targetDir, name);
    for (const target of targets) {
      await rmrf(target);
      await mkdir(target, { recursive: true });
      const dest = path.join(target, name);
      await copyFile(src, dest);
    }
  }
};
