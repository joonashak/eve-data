import argv from "./args";
import systemData from "./systems/systemData";
import wormholeEffects from "./wormholeEffects";

const createFileFunctions: { [key: string]: () => Promise<void> } = {
  systems: systemData,
  wormholeEffects: wormholeEffects,
};

export default async () => {
  let { select } = argv;

  if (select === undefined) {
    select = Object.keys(createFileFunctions);
  }

  for (const key of select) {
    await createFileFunctions[key]();
  }
};
