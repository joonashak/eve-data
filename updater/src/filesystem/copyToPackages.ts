import { copyFile, mkdir } from "fs/promises";
import path from "path";
import { pick } from "lodash";
import argv from "../args";
import config from "../config";
import { rmrf } from "./initialize";

const selectDataFiles = () => {
  const { select } = argv;
  const { dataFiles } = config;

  if (!select) {
    return Object.values(dataFiles);
  }

  return Object.values(pick(dataFiles, select));
};

/**
 * Copy data files to target directories.
 */
export default async () => {
  const { targetDir } = config;
  const selectedFiles = selectDataFiles();

  for (const file of selectedFiles) {
    const { name, targets } = file;
    const src = path.join(targetDir, name).concat(".json");
    for (const target of targets) {
      await rmrf(target);
      await mkdir(target, { recursive: true });
      const dest = path.join(target, name).concat(".json");
      await copyFile(src, dest);
    }
  }
};
