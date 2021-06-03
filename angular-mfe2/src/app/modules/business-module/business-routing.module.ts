import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BusinessComponent} from "./business/business.component";

const routes: Routes = [
  {
    path: 'childMfe2Business',
    component: BusinessComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'childMfe2Business'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'childMfe2Business'
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
