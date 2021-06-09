import { Component, OnInit } from '@angular/core';
import {NotesService} from "../notes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PluginGlobalEventBusReceiver} from "../../../app.module";
import {Note} from "../models/note.model";

@Component({
  selector: 'app-business-1',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.less']
})
export class BusinessComponent {

  public formGroup: FormGroup;
  public notes: Array<Note> = [];

  constructor(private notesService: NotesService,
              private formBuilder: FormBuilder,
              private pluginGlobalEventBusReceiver: PluginGlobalEventBusReceiver
              ) {
    this.formGroup = this.formBuilder.group({
      type: [null],
      subject: [null, Validators.required],
      body: [null]
    });
    this.notes = this.notesService.getAllNotes();
    this.pluginGlobalEventBusReceiver.addEventListener("message", (event) => {
        if(event.data.name === "AddNoteEvent") {
          this.notes.unshift(event.data.payload);
        }
    })
  }

  public saveNote(): void {
    this.notesService.saveNote(this.formGroup.value);
  }
}
