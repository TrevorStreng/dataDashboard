module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
    // ! Need to get certificate to sign my code
    // ^ https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {
    //     certificateFile: './cert.pfx',
    //     certificatePassword: process.env.CERTIFICATE_PASSWORD
    //   }
    // }
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
