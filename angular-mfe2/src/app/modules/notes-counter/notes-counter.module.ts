import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotesCounterComponent} from './notes-counter/notes-counter.component';
import {NotesCounterRoutingModule} from "./notes-counter-routing.module";


@NgModule({
  declarations: [
    NotesCounterComponent
  ],
  imports: [
    CommonModule,
    NotesCounterRoutingModule
  ]
})
export class NotesCounterModule {
}
