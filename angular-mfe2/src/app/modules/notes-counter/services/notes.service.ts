import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Note} from '../models/note.model';

@Injectable()
export class NotesService {
  public getAllNotes(): Observable<Note[]> {
    return of([]);
  }
}
