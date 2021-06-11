import {Injectable} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {FederationPlugin} from './microfrontend.model';
import {Observable, of} from "rxjs";
import {shareReplay, switchMap, tap} from "rxjs/operators";
import {buildRoutes} from "../utils/route-utils";
import {loadRemoteEntry} from "../utils/federation-utils";
import {ANGULAR_REMOTE_COMPONENTS_DESCRIPTOR, SAMPLE_CONFIGURATION} from "./sample-configuration";

@Injectable()
export class FederationPluginService {

  constructor(private router: Router) {}

  private static loadConfiguration(): Observable<ReadonlyArray<FederationPlugin>> {
    // just a sample, need to load this configuration from backend
    return of(SAMPLE_CONFIGURATION);
  }

  public getRemoteComponentConfiguration(pluginName: string): Observable<FederationPlugin> {
    // just a sample, need to load this configuration from backend
    return of(ANGULAR_REMOTE_COMPONENTS_DESCRIPTOR[pluginName]);
  }

  loadRoutesConfig(): Observable<ReadonlyArray<FederationPlugin>> {
    return of(window.sessionStorage.getItem("routes_configuration"))
      .pipe(
        switchMap((routesConfigurationItem: string) => {
          if (routesConfigurationItem) {
            const routesConfiguration: ReadonlyArray<FederationPlugin> = JSON.parse(routesConfigurationItem);
            return of(routesConfiguration);
          }
          return FederationPluginService.loadConfiguration().pipe(
            tap((routes: ReadonlyArray<FederationPlugin>) => {
              window.sessionStorage.setItem("routes_configuration", JSON.stringify(routes));
            })
          );
        }),
        tap((routes: ReadonlyArray<FederationPlugin>) => {
          const appRoutes: Routes = buildRoutes(routes);
          this.router.resetConfig(appRoutes);
          this.loadRemoteContainersByRoutes(routes);
        }),
        shareReplay(1)
      )

  }

  async loadRemoteContainersByRoutes(routes: ReadonlyArray<FederationPlugin>) {
    return Promise.all(routes.map((route: FederationPlugin) => {
      return loadRemoteEntry(route.remoteEntry);
    }))
  }

}
