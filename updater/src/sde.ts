import axios from "axios";
import { createWriteStream } from "fs";
import { unlink, readFile } from "fs/promises";
import { resolve } from "path";
import unzip from "extract-zip";
import config from "./config";
import args from "./args";

const {
  sde: { downloadUrl, tempFile, unzipDir },
} = config;

/**
 * Download SDE (Static Data Export) from EVE's dev website and save locally.
 */
export const downloadSde = async () => {
  const { download } = args;

  if (download) {
    await executeDownload();
    return;
  }

  // Make sure SDE exists even if download flag was not set.
  try {
    await readFile(`${unzipDir}/sde/bsd/invNames.yaml`);
  } catch (error) {
    await executeDownload();
  }
};

const executeDownload = async () => {
  console.log("Downloading SDE.");

  const res = await axios(downloadUrl, {
    responseType: "stream",
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  await res.data.pipe(createWriteStream(tempFile));
  await new Promise((resolve) => res.data.on("end", resolve));

  console.log("SDE downloaded. Extracting ZIP.");
  const dir = resolve(unzipDir);
  await unzip(tempFile, { dir });
  await unlink(tempFile);
  console.log("SDE fetch complete.");
};
