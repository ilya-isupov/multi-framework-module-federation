import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BusinessComponent} from "./business/business.component";

const routes: Routes = [
  {
    path: 'childBusiness',
    component: BusinessComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'childBusiness'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'childBusiness'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BusinessRoutingModule { }
