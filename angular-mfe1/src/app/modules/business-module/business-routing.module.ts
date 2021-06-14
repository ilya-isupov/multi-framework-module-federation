import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BusinessComponent} from "./business/business.component";

const routes: Routes = [
  {
    path: 'notesPlugin',
    component: BusinessComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'notesPlugin'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notesPlugin'
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
