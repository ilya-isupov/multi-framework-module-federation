const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "angularMfe1",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "angular_mfe_1",
      library: {type: "var", name: "angular_mfe_1"},
      filename: "remoteEntry.js",
      exposes: {
        MfeModule: "./src/app/modules/business-module/business.module.ts",
      },
      shared: {
        "@angular/core": {singleton: true, strictVersion: true},
        "@angular/common": {singleton: true, strictVersion: true},
        "@angular/common/http": {singleton: true, strictVersion: true},
        "@angular/router": {singleton: true, strictVersion: true},
      }

    }),
  ],
};
