import { writeFile } from "fs/promises";
import config from "./config";
import initialize from "./filesystem/initialize";
import { downloadSde } from "./sde";
import getSystemData from "./systems/systemData";
import getWormholeEffects from "./wormholeEffects";

const main = async () => {
  const hrstart = process.hrtime();

  await initialize();

  await downloadSde();

  const effects = await getWormholeEffects();
  const effectsStr = JSON.stringify(effects, null, 4);
  await writeFile(`${config.targetDir}/wormholeEffects.json`, effectsStr);

  const systemData = await getSystemData();
  const systemDataStr = JSON.stringify(systemData, null, 4);
  await writeFile(`${config.targetDir}/systems.json`, systemDataStr);

  console.log(`\nTOOK ${process.hrtime(hrstart)[0]} s`);
};

main();

// FIXME: Run without re-downloading SDE.
