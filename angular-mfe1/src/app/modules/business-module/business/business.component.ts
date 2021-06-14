import {AfterContentInit, Component, Inject, Optional, ViewEncapsulation} from '@angular/core';
import {NotesService} from "../notes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Note} from "../models/note.model";
import {EventBusService} from "../models/event-bus.service";

@Component({
  selector: 'app-business-1',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BusinessComponent implements AfterContentInit {

  public formGroup: FormGroup;
  public notes: Array<Note> = [];

  constructor(private notesService: NotesService,
              private formBuilder: FormBuilder,
              @Optional() @Inject("GLOBAL_EVENT_BUS") private pluginEventBus: EventBusService
              ) {
    this.formGroup = this.formBuilder.group({
      type: [null],
      subject: [null, Validators.required],
      body: [null]
    });

  }

  ngAfterContentInit(): void {
    this.notes = this.notesService.getAllNotes();
    this.notesService.postNotesCountMessage(this.notes?.length);
  }

  public saveNote(): void {
    this.notesService.saveNote(this.formGroup.value);
    this.notes.unshift(this.formGroup.value);
    this.notesService.postNotesCountMessage(this.notes?.length);
  }
}
