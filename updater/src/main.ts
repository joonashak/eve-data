import createSelectedFiles from "./createSelectedFiles";
import copyToPackages from "./filesystem/copyToPackages";
import initialize from "./filesystem/initialize";
import { downloadSde } from "./sde";

const main = async () => {
  const hrstart = process.hrtime();
  await initialize();
  await downloadSde();

  await createSelectedFiles();

  // FIXME: Does not work with createSelectedFiles if all files are not generated.
  await copyToPackages();

  console.log(`\nTOOK ${process.hrtime(hrstart)[0]} s`);
};

main();
