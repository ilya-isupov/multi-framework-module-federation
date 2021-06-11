import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";

const routes: Routes = [
  {
    path: 'business',
    loadChildren: () => import('./modules/notes-counter/notes-counter.module').then((module) => module.NotesCounterModule),
  },
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
