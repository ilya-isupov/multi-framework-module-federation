import {loadRemoteModule} from './federation-utils';
import {Routes} from '@angular/router';
import {FederationPlugin} from '../microfrontends/microfrontend.model';
import {AngularWrapperComponent} from '../components/angular-wrapper/angular-wrapper.component';
import {ReactWrapperComponent} from '../components/react-wrapper/react-wrapper.component';
import {WelcomeComponent} from '../components/welcome/welcome.component';

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
              loadChildren: () => loadRemoteModule(mfe).then((m) => m[mfe.moduleClassName]),
            };
          }
          default: {
            return {
              path: mfe.routePath,
              loadChildren: () => loadRemoteModule(mfe).then((m) => m[mfe.moduleClassName]),
            };
          }
        }
      }
      case 'react': {
        return {
          path: mfe.routePath,
          children: [
            {
              path: "**",
              component: ReactWrapperComponent,
              data: {configuration: mfe}
            }
          ]
        }
      }
      default: {
        return {
          path: mfe.routePath, // TODO: add UnknownPluginType component to catch incorrect configuration
          data: {configuration: mfe}
        };
      }
    }
  });

  return [...(lazyRoutes || []), ...APPLICATION_ROUTES];
}
