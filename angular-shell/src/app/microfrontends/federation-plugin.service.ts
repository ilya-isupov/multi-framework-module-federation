import {Injectable} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {FederationPlugin} from './microfrontend.model';
import {Observable, of} from 'rxjs';
import {shareReplay, switchMap, take, tap} from 'rxjs/operators';
import {buildRoutes} from '../utils/route-utils';
import {loadRemoteEntry} from '../utils/federation-utils';
import {ANGULAR_REMOTE_COMPONENTS_DESCRIPTOR, NAVIGATION_ALIASES_MAP_TO_ROUTE_URL, SAMPLE_CONFIGURATION} from './sample-configuration';
import {AppService} from '../app.service';
import {NavigationAlias} from './navigation.const';

@Injectable()
export class FederationPluginService {
  private static readonly ROUTES_CONFIGURATION = 'routes_configuration';

  constructor(private router: Router) {
  }

  private static loadConfiguration(): Observable<ReadonlyArray<FederationPlugin>> {
    // just a sample, need to load this configuration from backend
    return of(SAMPLE_CONFIGURATION);
  }

  private static getMappingAliasToRouteUrl(): Observable<Record<NavigationAlias, FederationPlugin['navigationAlias']>> {
    // just a sample, need to load this configuration from backend
    return of(NAVIGATION_ALIASES_MAP_TO_ROUTE_URL);
  }

  public getRemoteComponentConfiguration(pluginName: string): Observable<FederationPlugin> {
    // just a sample, need to load this configuration from backend
    return of(ANGULAR_REMOTE_COMPONENTS_DESCRIPTOR[pluginName]);
  }

  loadRoutesConfig(): Observable<ReadonlyArray<FederationPlugin>> {
    return of(window.sessionStorage.getItem(FederationPluginService.ROUTES_CONFIGURATION))
      .pipe(
        switchMap((routesConfigurationItem: string) => {
          if (routesConfigurationItem) {
            const routesConfiguration: ReadonlyArray<FederationPlugin> = JSON.parse(routesConfigurationItem);
            return of(routesConfiguration);
          }
          return FederationPluginService.loadConfiguration().pipe(
            tap((routes: ReadonlyArray<FederationPlugin>) => {
              window.sessionStorage.setItem(FederationPluginService.ROUTES_CONFIGURATION, JSON.stringify(routes));
            })
          );
        }),
        tap((routes: ReadonlyArray<FederationPlugin>) => {
          const appRoutes: Routes = buildRoutes(routes);
          this.router.resetConfig(appRoutes);
          AppService.setRoutes(routes);
          FederationPluginService.getMappingAliasToRouteUrl()
            .pipe(take(1))
            .subscribe((mappingAliases: Record<NavigationAlias, FederationPlugin['navigationAlias']>) => {
              AppService.setRouteAliases(this.constructRouteAliases(routes, mappingAliases));
            });
          this.loadRemoteContainersByRoutes(routes);
        }),
        shareReplay(1)
      );
  }

  private constructRouteAliases(routes: ReadonlyArray<FederationPlugin>, aliasMap: Record<NavigationAlias, FederationPlugin['navigationAlias']>): Record<NavigationAlias, URL['href']> {
    const routeAliases: Record<NavigationAlias, URL['href']> = {
      NOTES_ADMIN_PANEL: '',
      NOTES_LIST: ''
    };
    Object.keys(NavigationAlias).forEach((navigationAliasKey) => {
      const url: string = routes.find((route: FederationPlugin) => route.navigationAlias === aliasMap?.[navigationAliasKey])?.routePath;
      routeAliases[navigationAliasKey] = `/${url ?? ''}`;
    });

    return routeAliases;
  }

  private async loadRemoteContainersByRoutes(routes: ReadonlyArray<FederationPlugin>): Promise<boolean[]> {
    return Promise.all(routes.map((route: FederationPlugin) => {
      return loadRemoteEntry(route.remoteEntry);
    }));
  }

}
