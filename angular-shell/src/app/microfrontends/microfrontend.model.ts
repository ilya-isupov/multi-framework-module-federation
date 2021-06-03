import { LoadRemoteModuleOptions } from '../utils/federation-utils';

export type Microfrontend = LoadRemoteModuleOptions & {
  displayName: string;
  routePath: string;
  moduleName: string;
  type: 'angular' | 'react';
  subType: 'module' | 'component';
};
