import {Component, Injectable, OnInit} from '@angular/core';
import {FederationPlugin} from './microfrontends/microfrontend.model';
import {Observable, of} from 'rxjs';
import {catchError, shareReplay} from 'rxjs/operators';
import {FederationPluginService} from './microfrontends/federation-plugin.service';

@Injectable()
export class TestService {
  getAllNotes: () => Observable<number>;
  loadDnsId: () => Observable<string>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  routes$: Observable<ReadonlyArray<FederationPlugin>>;
  notesCounterConfiguration$: Observable<FederationPlugin>;
  notesCounterExtendedConfiguration$: Observable<FederationPlugin>;

  constructor(private federationPluginService: FederationPluginService) {
  }

  private get notesService(): Promise<TestService> {
    return this.federationPluginService.getRemoteService<TestService>('notesService');
  }

  ngOnInit(): void {
    this.routes$ = this.federationPluginService.loadRoutesConfig().pipe(shareReplay(1));
    this.notesCounterConfiguration$ = this.federationPluginService.getRemoteComponentConfiguration('notesCounter');
    this.notesCounterExtendedConfiguration$ = this.federationPluginService.getRemoteComponentConfiguration('notesCounterExtended');

    this.notesService.then((service) => {
      service.getAllNotes().subscribe((count) => {
        console.log('COUNT: ' + count);
      });
      service.loadDnsId()
        .pipe(
          catchError((error) => {
            return of(null);
          })
        )
        .subscribe((dnsId: string) => {
          console.log('ID: ' + dnsId);
        });
    });
  }
}
