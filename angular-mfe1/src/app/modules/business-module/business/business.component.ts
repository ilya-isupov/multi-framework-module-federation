import {AfterContentInit, Component, Inject, Optional, ViewEncapsulation} from '@angular/core';
import {NotesService} from '../notes.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note} from '../models/note.model';
import {EventBusService} from '../models/event-bus.service';
import {Router} from '@angular/router';
import {NavigationAlias} from '../models/navigation.const';
import {GlobalNavigationService} from '../models/navigation.service';

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
              private router: Router,
              @Optional() @Inject('GLOBAL_EVENT_BUS') private pluginEventBus: EventBusService,
              @Optional() @Inject('GLOBAL_NAVIGATION_SERVICE') private globalNavigationService: GlobalNavigationService
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

  public _navigateToAdminTool(): void {
    this.globalNavigationService?.navigate(NavigationAlias.NOTES_ADMIN_PANEL);
  }
}
