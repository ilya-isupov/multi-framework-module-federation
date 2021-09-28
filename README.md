# Multi framework module federation technical example

This project is full e2e example about ability using angular/react/vue in one application base on Module Federation.

## Development server

Run `yarn deps:all` to install all dependencies.
Run `yarn start:all` to start all microfrontends and host application by one button press.

Example consist of: host (angular 11), several angular plugins (angular 11, 12), several react plugins and vue plugin.

## How to move to module federation plugin bundling (Angular)

1. Add resolution field to package.json
> "resolutions": {"webpack": "^5.0.0"}
2. Set yarn package manager default for project
> ng config cli.packageManager yarn
3. Add @angular-architects/module-federation package. It will automatically add config-overrides.js and other settings needed to use module federation
> ng add @angular-architects/module-federation
4. After that configure partially configuration for config-overrides.js
Example for remote plugin
```javascript
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

module.exports = {
      output: {
          uniqueName: "angular_mfe_1",
      },
      optimization: {
          runtimeChunk: false,
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
          })
      ],
  };
```
