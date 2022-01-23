import { readFile } from "fs/promises";
import { parse as parseYaml } from "yaml";
import { SdeName } from "../types/sdeTypes";

let invNames: SdeName[] = [];

const getAllInvNames = async () => {
  if (!invNames.length) {
    const invNamesYaml = await readFile("sde/bsd/invNames.yaml", {
      encoding: "utf8",
    });
    invNames = parseYaml(invNamesYaml);

    // Fix 6E-578 name that gets parsed as a zero for whatever reason.
    invNames.find(({ itemID }) => itemID === 30003270)!.itemName = "6E-578";
  }

  return invNames;
};

export const readInvNamesIntoMemory = async (): Promise<void> => {
  await getAllInvNames();
};

const getNameById = async (id: number): Promise<string> => {
  const names = await getAllInvNames();
  const match = names.find(({ itemID }) => itemID === id);

  if (!match) {
    throw new Error(`Name not found for id ${id} in getNameById.`);
  }

  return match.itemName;
};

export default getNameById;
