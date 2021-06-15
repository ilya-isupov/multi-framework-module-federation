import {Router} from '@angular/router';
import {AppService} from '../app.service';
import {take} from 'rxjs/operators';
import {NavigationAlias} from './navigation.const';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalNavigationService {

  constructor(private router: Router) {
  }

  public navigate(routeAlias: NavigationAlias): void {
    AppService.getRouteAliases().pipe(take(1)).subscribe((routeAliases: Record<string, URL['href']>) => {
      this.router.navigateByUrl(routeAliases[routeAlias]);
    });
  }
}
