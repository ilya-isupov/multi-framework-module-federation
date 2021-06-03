# AngularMfe1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## How to move to module federation plugin bundling (Angular)

1. Add resolution field to package.json
> "resolutions": {"webpack": "^5.0.0"}
2. Set yarn package manager default for project
> ng config cli.packageManager yarn
3. Add @angular-architects/module-federation package. It will automatically add webpack.config.js and other settings needed to use module federation
> ng add @angular-architects/module-federation
4. After that configure partially configuration for webpack.config.js
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
