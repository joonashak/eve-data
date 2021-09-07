import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import config from "./config";

const dataFileNames = Object.keys(config.dataFiles);
const prettySelectValues = dataFileNames.map((name) => `"${name}"`).join(", ");

const argv = yargs(hideBin(process.argv))
  .options({
    download: {
      type: "boolean",
      default: false,
      alias: "d",
      desc: "Force downloading SDE data.",
    },
    select: {
      type: "array",
      alias: "s",
      desc: `Select which data files to create, separated by spaces. If not set, generates all files. Possible values: ${prettySelectValues}`,
    },
  })
  .parseSync();

export default argv;
