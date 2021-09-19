import {BehaviorSubject, Observable} from 'rxjs';
import {FederationPlugin} from './microfrontends/microfrontend.model';
import {NavigationAlias} from './microfrontends/navigation.const';

export class AppService {
  private static routesSubject: BehaviorSubject<ReadonlyArray<FederationPlugin>> = new BehaviorSubject([]);
  private static routes$: Observable<ReadonlyArray<FederationPlugin>> = AppService.routesSubject;

  private static routeAliasesSubject: BehaviorSubject<Record<NavigationAlias, URL['href']>> = new BehaviorSubject(null);
  private static routeAliases$: Observable<Record<NavigationAlias, URL['href']>> = AppService.routeAliasesSubject;

  public static setRouteAliases(routeAliases: Record<NavigationAlias, URL['href']>): void {
    AppService.routeAliasesSubject.next(routeAliases);
  }

  public static getRouteAliases(): Observable<Record<NavigationAlias, URL['href']>> {
    return AppService.routeAliases$;
  }

  public static setRoutes(routes: ReadonlyArray<FederationPlugin>): void {
    AppService.routesSubject.next(routes);
  }

  public static getRoutes(): Observable<ReadonlyArray<FederationPlugin>> {
    return AppService.routes$;
  }
}
