type Config = {
  sde: {
    downloadUrl: string;
    tempFile: string;
    unzipDir: string;
  };
  targetDir: string;
  dataFiles: {
    [key: string]: {
      name: string;
      targets: string[];
    };
  };
};

const config: Config = {
  sde: {
    downloadUrl:
      "https://eve-static-data-export.s3-eu-west-1.amazonaws.com/tranquility/sde.zip",
    tempFile: "./sde.zip",
    unzipDir: "./",
  },
  targetDir: "./data",
  dataFiles: {
    wormholeEffects: { name: "wormholeEffects", targets: [] },
    systems: {
      name: "systems",
      targets: ["../packages/systems/assets"],
    },
  },
};

export default config;
