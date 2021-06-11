import {FederationPlugin} from "./microfrontend.model";

export const SAMPLE_CONFIGURATION: ReadonlyArray<FederationPlugin> = [
  {
    "type": "angular",
    "subType": "module",
    "remoteEntry": "http://localhost:4201/remoteEntry.js",
    "remoteName": "angular_mfe_1",
    "exposedModule": "MfeModule",
    "displayName": "Notes",
    "routePath": "notes",
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

export const ANGULAR_REMOTE_COMPONENTS_DESCRIPTOR: Record<string, FederationPlugin> = {
  notesCounter: {
    "type": "angular",
    "subType": "component",
    "remoteEntry": "http://localhost:4202/remoteEntry.js",
    "remoteName": "angular_mfe_2",
    "exposedModule": "NotesCounter",
    "moduleName": "NotesCounterComponent"
  }
}
