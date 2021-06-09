const webpack = require("webpack");
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
    uniqueName: "angularShell",
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
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new ModuleFederationPlugin({
      shared: {
        '@angular/common/http': {
          requiredVersion: dependencies['@angular/common'],
          singleton: false,
          eager: true
        },
        '@angular/common': {
          version: dependencies['@angular/common'],
          singleton: false,
          eager: true
        },
        '@angular/core': {
          version: dependencies['@angular/core'],
          requiredVersion: dependencies['@angular/core'],
          singleton: false,
          eager: true
        },
        '@angular/platform-browser': {
          version: dependencies['@angular/platform-browser'],
          requiredVersion: dependencies['@angular/platform-browser'],
          singleton: false,
          eager: true
        },
        '@angular/platform-browser-dynamic': {
          version: dependencies['@angular/platform-browser-dynamic'],
          requiredVersion: dependencies['@angular/platform-browser-dynamic'],
          singleton: false,
          eager: true
        },
        '@angular/router': {
          version: dependencies['@angular/router'],
          requiredVersion: dependencies['@angular/router'],
          singleton: false,
          eager: true
        },
        '@angular/cdk/a11y': {
          version: dependencies['@angular/cdk/a11y'],
          requiredVersion: dependencies['@angular/cdk/a11y'],
          singleton: false,
          eager: true
        },
        '@angular/animations': {
          version: dependencies['@angular/animations'],
          requiredVersion: dependencies['@angular/animations'],
          singleton: false,
          eager: true
        },
      }

    })
  ],
};
