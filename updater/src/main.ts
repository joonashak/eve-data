import createSelectedFiles from "./createSelectedFiles";
import copyToPackages from "./filesystem/copyToPackages";
import initialize from "./filesystem/initialize";
import { readInvNamesIntoMemory } from "./invNames/getNameById";
import { downloadSde } from "./sde";

const main = async () => {
  const hrstart = process.hrtime();
  await initialize();
  await downloadSde();
  await readInvNamesIntoMemory();

  await createSelectedFiles();
  await copyToPackages();

  console.log(`\nTOOK ${process.hrtime(hrstart)[0]} s`);
};

main();
