import {Inject, Injectable, Optional} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Note} from './models/note.model';
import {EventBusService} from './models/event-bus.service';

@Injectable()
export class NotesService {
  constructor(@Optional() @Inject('GLOBAL_EVENT_BUS') private pluginEventBus: EventBusService) {
  }

  public saveNote(note: Note): Observable<void> {
    let existingNotes: Array<Note>;
    const existingNotesString: string | null = window.localStorage.getItem('my_notes');
    if (!existingNotesString) {
      existingNotes = [];
    } else {
      existingNotes = JSON.parse(existingNotesString);
    }

    existingNotes.push(note);
    this.pluginEventBus?.postMessage({name: 'AddNoteEvent', payload: note});
    return of(window.localStorage.setItem('my_notes', JSON.stringify(existingNotes)));
  }

  public getAllNotes(): Array<Note> {
    let existingNotes: Array<Note>;
    const existingNotesString: string | null = window.localStorage.getItem('my_notes');
    if (!existingNotesString) {
      existingNotes = [];
    } else {
      existingNotes = JSON.parse(existingNotesString);
    }
    return existingNotes;
  }

  public postNotesCountMessage(count: number): void {
    this.pluginEventBus?.postMessage({name: 'NotesCountUpdate', payload: {count}});
  }
}
