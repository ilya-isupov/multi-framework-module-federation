import {AfterContentInit, Component, ElementRef, Input} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {take} from 'rxjs/operators';
import {FederationPlugin} from '../../microfrontends/microfrontend.model';
import {loadRemoteModule} from '../../utils/federation-utils';
import {EventBusService} from '../../microfrontends/event-bus.service';
import {GlobalNavigationService} from '../../microfrontends/global-navigation.service';

@Component({
  selector: 'self-run-wrapper',
  template: '',
  styles: [':host {height: 100%; overflow: auto;}']
})
export class SelfRunWrapperComponent implements AfterContentInit {

  @Input() props: Record<string, any>;

  constructor(private hostRef: ElementRef,
              private route: ActivatedRoute,
              private eventBusService: EventBusService,
              private globalNavigationService: GlobalNavigationService
  ) {
  }

  async ngAfterContentInit(): Promise<void> {
    this.route.data
      .pipe(take(1))
      .subscribe(async (data: Data) => {
        const configuration: FederationPlugin = data.configuration;
        const component = await loadRemoteModule({
          remoteEntry: configuration.remoteEntry,
          remoteName: configuration.remoteName,
          exposedModule: configuration.exposedModule
        });

        component.default(this.hostRef.nativeElement, this.props);
      });
  }
}






