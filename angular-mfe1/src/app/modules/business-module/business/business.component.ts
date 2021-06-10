import {AfterContentInit, Component, Inject, OnInit, Optional} from '@angular/core';
import {NotesService} from "../notes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Note} from "../models/note.model";
import {EventBusService} from "../models/event-bus.service";

@Component({
  selector: 'app-business-1',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.less']
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
    this.pluginEventBus?.addEventListener("message", (event) => {
      if(event.data.name === "AddNoteEvent") {
        this.notes.unshift(event.data.payload);
      }
    })
  }

  public saveNote(): void {
    this.notesService.saveNote(this.formGroup.value);
  }
}
