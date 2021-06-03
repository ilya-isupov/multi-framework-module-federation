const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const dependencies = require("./package.json").dependencies;

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
        '@angular/common/http': {
          version: dependencies['@angular/common'],
          requiredVersion: dependencies['@angular/common'],
          singleton: true,

        },
        '@angular/common': {
          version: dependencies['@angular/common'],
          requiredVersion: dependencies['@angular/common'],
          singleton: true,

        },
        '@angular/core': {
          version: dependencies['@angular/core'],
          requiredVersion: dependencies['@angular/core'],
          singleton: true,

        },
        '@angular/platform-browser': {
          version: dependencies['@angular/platform-browser'],
          requiredVersion: dependencies['@angular/platform-browser'],
          singleton: true,

        },
        '@angular/platform-browser-dynamic': {
          version: dependencies['@angular/platform-browser-dynamic'],
          requiredVersion: dependencies['@angular/platform-browser-dynamic'],
          singleton: true,

        },
        '@angular/router': {
          version: dependencies['@angular/router'],
          requiredVersion: dependencies['@angular/router'],
          singleton: true,

        },
        '@angular/cdk/a11y': {
          version: dependencies['@angular/cdk/a11y'],
          requiredVersion: dependencies['@angular/cdk/a11y'],
          singleton: true,

        },
        '@angular/animations': {
          version: dependencies['@angular/animations'],
          requiredVersion: dependencies['@angular/animations'],
          singleton: true,

        }
      }

    }),
  ],
};
