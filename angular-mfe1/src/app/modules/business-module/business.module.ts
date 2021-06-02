import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessComponent} from './business/business.component';
import {BusinessRoutingModule} from "./business-routing.module";


@NgModule({
  declarations: [
    BusinessComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule
  ]
})
export class BusinessModule {
}
