import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NotesCounterComponent} from "./notes-counter/notes-counter.component";

const routes: Routes = [
  {
    path: 'notesCounter',
    component: NotesCounterComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'notesCounter'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notesCounter'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotesCounterRoutingModule { }
