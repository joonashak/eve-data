import { copyFile, mkdir } from "fs/promises";
import config from "../config";

/**
 * Copy data files to target directories.
 */
export default async () => {
  const { dataFiles, targetDir } = config;

  for (const file of Object.values(dataFiles)) {
    const { name, targets } = file;
    const src = [targetDir, name].join("/");
    for (const target of targets) {
      await mkdir(target, { recursive: true });
      const dest = [target, name].join("/");
      await copyFile(src, dest);
    }
  }
};
