import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactWrapperComponent} from './components/react-wrapper/react-wrapper.component';

export const REACT_WRAPPER_ROUTES: Routes = [
  {
    path: '',
    component: ReactWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(REACT_WRAPPER_ROUTES)],
  exports: [RouterModule]
})
export class ReactWrapperRoutesRoutingModule {
}
