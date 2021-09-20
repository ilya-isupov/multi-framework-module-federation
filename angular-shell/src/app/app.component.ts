import {Component, Inject, OnInit} from '@angular/core';
import {FederationPlugin} from './microfrontends/microfrontend.model';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {FederationPluginService} from './microfrontends/federation-plugin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  routes$: Observable<ReadonlyArray<FederationPlugin>>;
  notesCounterConfiguration$: Observable<FederationPlugin>;
  notesCounterExtendedConfiguration$: Observable<FederationPlugin>;
  private notesService: any;

  constructor(private federationPluginService: FederationPluginService
              ) {
  }

  ngOnInit(): void {
    // this.notesService = this.federationPluginService.injectService('NotesCounterModule', NotesService);
    this.routes$ = this.federationPluginService.loadRoutesConfig().pipe(shareReplay(1));
    this.notesCounterConfiguration$ = this.federationPluginService.getRemoteComponentConfiguration('notesCounter');
    this.notesCounterExtendedConfiguration$ = this.federationPluginService.getRemoteComponentConfiguration('notesCounterExtended');
  }
}
