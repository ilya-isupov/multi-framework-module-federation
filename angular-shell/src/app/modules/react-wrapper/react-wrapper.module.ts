import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactWrapperRoutesRoutingModule} from "./react-wrapper.routes";
import {ReactWrapperComponent} from './components/react-wrapper/react-wrapper.component';


@NgModule({
  declarations: [
    ReactWrapperComponent
  ],
  exports: [
    ReactWrapperComponent
  ],
  imports: [
    CommonModule,
    ReactWrapperRoutesRoutingModule
  ]
})
export class ReactWrapperModule {
}
