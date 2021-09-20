import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotesCounterComponent} from './notes-counter/notes-counter.component';
import {NotesCounterRoutingModule} from './notes-counter-routing.module';
import {NotesService} from './services/notes.service';


@NgModule({
  declarations: [
    NotesCounterComponent
  ],
  imports: [
    CommonModule,
    NotesCounterRoutingModule
  ],
  providers: [
    {
      provide: 'NotesService',
      useClass: NotesService
    }
  ]
})
export class NotesCounterModule {
}
