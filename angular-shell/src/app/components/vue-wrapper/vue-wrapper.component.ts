import {AfterContentInit, Component, ElementRef, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {take} from 'rxjs/operators';
import {FederationPlugin} from '../../microfrontends/microfrontend.model';
import {loadRemoteModule} from '../../utils/federation-utils';
import {EventBusService} from '../../microfrontends/event-bus.service';
import {GlobalNavigationService} from '../../microfrontends/global-navigation.service';
import {createApp} from 'vue';

@Component({
  selector: 'vue-wrapper',
  template: '',
  styles: [':host {height: 100%; overflow: auto;}']
})
export class VueWrapperComponent implements AfterContentInit, OnDestroy {

  vueComponentRef;

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

        const vueComponent = component[configuration.moduleClassName || 'default'];
        this.vueComponentRef = createApp(vueComponent, {
          data: () => {
            return (this.props || {});
          }
        });
        this.vueComponentRef.mount(this.hostRef.nativeElement);
      });
  }

  ngOnDestroy(): void {
  }
}






