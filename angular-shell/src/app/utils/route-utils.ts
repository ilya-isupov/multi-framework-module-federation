import {loadRemoteModule} from './federation-utils';
import {Routes} from '@angular/router';
import {FederationPlugin} from '../microfrontends/microfrontend.model';
import {APPLICATION_ROUTES} from "../app-routing.module";
import {AngularWrapperComponent} from "../components/angular-wrapper/angular-wrapper.component";
import {ReactWrapperComponent} from "../components/react-wrapper/react-wrapper.component";

export function buildRoutes(options: ReadonlyArray<FederationPlugin>): Routes {
  const lazyRoutes: Routes = options?.map((mfe: FederationPlugin) => {
    switch (mfe.type) {
      case "angular": {
        switch (mfe.subType) {
          case "module": {
            return {
              path: mfe.routePath,
              loadChildren: () => loadRemoteModule(mfe).then((m) => m[mfe.moduleName]),
            }
          }
          case "component": {
            return {
              path: mfe.routePath,
              component: AngularWrapperComponent,
              data: {configuration: mfe}
            }
          }
        }
        break;
      }
      case "react": {
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
        }
      }
    }
  });

  return [...(lazyRoutes || []), ...APPLICATION_ROUTES];
}
