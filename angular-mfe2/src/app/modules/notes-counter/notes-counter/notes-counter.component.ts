import {Component, Inject, OnInit, Optional} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {EventBusService} from "../models/event-bus.service";

@Component({
  selector: 'notes-counter',
  templateUrl: './notes-counter.component.html',
  styleUrls: ['./notes-counter.component.less']
})
export class NotesCounterComponent implements OnInit {
  notesCount$!: Observable<number>;
  notesCountSubject$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(@Optional() @Inject("GLOBAL_EVENT_BUS") private pluginEventBus: EventBusService) { }

  ngOnInit(): void {
    this.notesCount$ = this.notesCountSubject$;
    this.pluginEventBus?.addEventListener("NotesCountUpdate", (event: MessageEvent) => {
      this.notesCountSubject$.next(event.data.payload.count);
    })
  }

}
