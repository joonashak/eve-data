import axios from "axios";
import { createWriteStream } from "fs";
import { unlink } from "fs/promises";
import { resolve } from "path";
import unzip from "extract-zip";
import config from "./config";

/**
 * Download SDE (Static Data Export) from EVE's dev website and save locally.
 */
export const downloadSde = async () => {
  console.log("Downloading SDE.");

  const res = await axios(config.sde.downloadUrl, {
    responseType: "stream",
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  await res.data.pipe(createWriteStream(config.sde.tempFile));
  await new Promise((resolve) => res.data.on("end", resolve));

  console.log("SDE downloaded. Extracting ZIP.");
  const dir = resolve(config.sde.unzipDir);
  await unzip(config.sde.tempFile, { dir });
  await unlink(config.sde.tempFile);
  console.log("SDE fetch complete.");
};
