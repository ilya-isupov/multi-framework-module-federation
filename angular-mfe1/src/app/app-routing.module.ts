import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'business',
    loadChildren: () => import('./modules/business-module/business.module').then((module) => module.BusinessModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'business'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
