import {FederationPlugin} from "./microfrontend.model";

export const SAMPLE_CONFIGURATION: ReadonlyArray<FederationPlugin> = [
  {
    "type": "angular",
    "subType": "module",
    "remoteEntry": "http://localhost:4201/remoteEntry.js",
    "remoteName": "angular_mfe_1",
    "exposedModule": "MfeModule",
    "displayName": "First lazy module plugin",
    "routePath": "firstModule",
    "moduleName": "BusinessModule"
  },
  {
    "type": "angular",
    "subType": "component",
    "remoteEntry": "http://localhost:4201/remoteEntry.js",
    "remoteName": "angular_mfe_1",
    "exposedModule": "BusinessComponent",
    "displayName": "First stupid component plugin",
    "routePath": "firstComponent",
    "moduleName": "BusinessComponent"
  },
  {
    "type": "angular",
    "subType": "module",
    "remoteEntry": "http://localhost:4202/remoteEntry.js",
    "remoteName": "angular_mfe_2",
    "exposedModule": "MfeModule",
    "displayName": "Second federation module plugin",
    "routePath": "secondModule",
    "moduleName": "BusinessModule"
  },
  {
    "type": "react",
    "remoteEntry": "http://localhost:8080/remoteEntry.js",
    "remoteName": "react_app",
    "exposedModule": "ReactApp",
    "displayName": "React shop application",
    "routePath": "reactShop",
    "moduleName": "MainApplicationPlugin"
  }
]
