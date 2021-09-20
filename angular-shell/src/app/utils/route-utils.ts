import {loadRemoteModule} from './federation-utils';
import {Routes} from '@angular/router';
import {FederationPlugin} from '../microfrontends/microfrontend.model';
import {AngularWrapperComponent} from '../components/angular-wrapper/angular-wrapper.component';
import {ReactWrapperComponent} from '../components/react-wrapper/react-wrapper.component';
import {WelcomeComponent} from '../components/welcome/welcome.component';
import {VueWrapperComponent} from '../components/vue-wrapper/vue-wrapper.component';
import {SelfRunWrapperComponent} from '../components/self-run-wrapper/self-run-wrapper.component';

const APPLICATION_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  }
];

export function buildRoutes(options: ReadonlyArray<FederationPlugin>): Routes {
  const lazyRoutes: Routes = options?.map((mfe: FederationPlugin) => {
    switch (mfe.type) {
      case 'angular': {
        switch (mfe.subType) {
          case 'routeModule': {
            return {
              path: mfe.routePath,
              loadChildren: () => loadRemoteModule(mfe).then((m) => m[mfe.moduleName]),
            };
          }
          default: {
            return {
              path: mfe.routePath,
              loadChildren: () => loadRemoteModule(mfe).then((m) => m[mfe.moduleName]),
            };
          }
        }
      }
      case 'react': {
        return {
          path: mfe.routePath,
          children: [
            {
              path: '**',
              component: ReactWrapperComponent,
              data: {configuration: mfe}
            }
          ]
        };
      }
      case 'vue': {
        return {
          path: mfe.routePath,
          children: [
            {
              path: '**',
              component: VueWrapperComponent,
              data: {configuration: mfe}
            }
          ]
        };
      }
      default: {
        return {
          path: mfe.routePath, // TODO: add UnknownPluginType component to catch incorrect configuration
          children: [
            {
              path: '**',
              component: SelfRunWrapperComponent,
              data: {configuration: mfe}
            }
          ]
        };
      }
    }
  });

  return [...(lazyRoutes || []), ...APPLICATION_ROUTES];
}
