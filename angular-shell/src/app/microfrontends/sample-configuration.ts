import {FederationPlugin} from './microfrontend.model';
import {NavigationAlias} from './navigation.const';

export const SAMPLE_CONFIGURATION: ReadonlyArray<FederationPlugin> = [
  {
    type: 'angular',
    subType: 'routeModule',
    remoteEntry: 'http://localhost:4201/remoteEntry.js',
    remoteName: 'angular_mfe_1',
    exposedModule: 'MfeModule',
    displayName: 'Notes',
    routePath: 'notes',
    moduleClassName: 'BusinessModule',
    navigationAlias: 'notesList'
  },
  {
    type: 'react',
    remoteEntry: 'http://localhost:8080/remoteEntry.js',
    remoteName: 'react_app',
    exposedModule: 'ReactApp',
    displayName: 'Notes admin panel',
    routePath: 'notesAdminPanel',
    navigationAlias: 'notesAdminPanel',
    moduleName: 'MainApplicationPlugin'
  },
  {
    remoteEntry: 'http://localhost:9000/remoteEntry.js',
    remoteName: 'vue_app',
    exposedModule: './AppWithRouting',
    displayName: 'Simple Vue App',
    routePath: 'vue',
    navigationAlias: 'vue'
  },
  {
    type: 'react',
    remoteEntry: 'http://localhost:8081/remoteEntry.js',
    remoteName: 'react_routes_app',
    exposedModule: 'RoutesApp',
    displayName: 'Nested routes example',
    routePath: 'routesReact',
    navigationAlias: 'routesReact',
    moduleClassName: 'MainApplicationPlugin'
  }
];

export const NAVIGATION_ALIASES_MAP_TO_ROUTE_URL: Record<NavigationAlias, FederationPlugin['navigationAlias']> = {
  NOTES_ADMIN_PANEL: 'notesAdminPanel',
  NOTES_LIST: 'notesList'
};

export const ANGULAR_REMOTE_COMPONENTS_DESCRIPTOR: Record<string, FederationPlugin> = {
  notesCounter: {
    type: 'angular',
    subType: 'component',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    remoteName: 'angular_mfe_2',
    exposedModule: 'NotesCounter',
    componentClassName: 'NotesCounterComponent'
  },
  notesCounterExtended: {
    type: 'angular',
    subType: 'componentModule',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    remoteName: 'angular_mfe_2',
    exposedModule: 'NotesCounterExtended',
    exposedComponent: 'NotesCounter',
    moduleClassName: 'NotesCounterModule',
    componentClassName: 'NotesCounterComponent'
  }
};

export const ANGULAR_REMOTE_SERVICE_DESCRIPTOR: Record<string, FederationPlugin> = {
  notesService: {
    type: 'angular',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    remoteName: 'angular_mfe_2',
    exposedModule: 'NotesCounterExtended',
    moduleClassName: 'NotesCounterModule',
    serviceClassName: 'NotesService'
  }
};
