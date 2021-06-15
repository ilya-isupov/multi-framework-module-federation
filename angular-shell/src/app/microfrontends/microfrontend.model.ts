import { LoadRemoteModuleOptions } from '../utils/federation-utils';

export type FederationPlugin = LoadRemoteModuleOptions & {
  displayName?: string;
  routePath?: string;
  moduleName: string;
  navigationAlias?: string;
  type: 'angular' | 'react';
  subType?: 'module' | 'component';
};
