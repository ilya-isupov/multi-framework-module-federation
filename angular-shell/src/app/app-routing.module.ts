import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";

export const APPLICATION_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APPLICATION_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
