import config from "./config";
import copyToPackages from "./filesystem/copyToPackages";
import initialize from "./filesystem/initialize";
import writeData from "./filesystem/writeData";
import { downloadSde } from "./sde";
import getSystemData from "./systems/systemData";
import getWormholeEffects from "./wormholeEffects";

const main = async () => {
  const hrstart = process.hrtime();
  await initialize();
  await downloadSde();

  const effects = await getWormholeEffects();
  await writeData(config.dataFiles.wormholeEffects.name, effects);

  const systemData = await getSystemData();
  await writeData(config.dataFiles.systems.name, systemData);

  await copyToPackages();

  console.log(`\nTOOK ${process.hrtime(hrstart)[0]} s`);
};

main();
