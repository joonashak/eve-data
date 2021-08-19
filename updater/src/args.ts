import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .options({
    download: { type: "boolean", default: false, alias: "d" },
  })
  .parseSync();

export default argv;
