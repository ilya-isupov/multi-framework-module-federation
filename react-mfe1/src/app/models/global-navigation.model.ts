import {NavigationAlias} from './navigation.const';

export type GlobalNavigationService = {
  navigate(routeAlias: NavigationAlias): void;
}

