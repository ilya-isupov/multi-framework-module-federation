import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Note} from "./models/note.model";
import {PluginGlobalEventBusProducer} from "../../app.module";

@Injectable()
export class NotesService {
  constructor(private pluginEventBus: PluginGlobalEventBusProducer) {
  }

  public saveNote(note: Note): Observable<void> {
    let existingNotes: Array<Note>;
    const existingNotesString: string | null = window.localStorage.getItem("my_notes");
    if (!existingNotesString) {
      existingNotes = [];
    } else {
      existingNotes = JSON.parse(existingNotesString);
    }

    existingNotes.push(note);
    this.pluginEventBus.postMessage({name: "AddNoteEvent", payload: note});
    return of(window.localStorage.setItem("my_notes", JSON.stringify(existingNotes)));
  }

  public getAllNotes(): Array<Note> {
    let existingNotes: Array<Note>;
    const existingNotesString: string | null = window.localStorage.getItem("my_notes");
    if (!existingNotesString) {
      existingNotes = [];
    } else {
      existingNotes = JSON.parse(existingNotesString);
    }
    return existingNotes;
  }
}
