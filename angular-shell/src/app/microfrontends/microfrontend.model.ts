import { LoadRemoteModuleOptions } from '../utils/federation-utils';

export type FederationPlugin = LoadRemoteModuleOptions & {
  displayName?: string;
  routePath?: string;
  moduleName?: string;
  moduleClassName?: string;
  componentClassName?: string;
  serviceClassName?: string;
  exposedComponent?: string;
  navigationAlias?: string;
  type?: 'angular' | 'react' | 'vue';
  subType?: 'routeModule' | 'componentModule' | 'component';
};
