import {AfterContentInit, Component, ElementRef, Input} from '@angular/core';
import React from 'react';
import ReactDOM from 'react-dom';
import {ActivatedRoute, Data} from '@angular/router';
import {take} from 'rxjs/operators';
import {FederationPlugin} from '../../microfrontends/microfrontend.model';
import {loadRemoteModule} from '../../utils/federation-utils';
import {EventBusService} from '../../microfrontends/event-bus.service';
import {GlobalNavigationService} from '../../microfrontends/global-navigation.service';


@Component({
  selector: 'react-wrapper',
  template: '',
  styles: [':host {height: 100%; overflow: auto;}']
})
export class ReactWrapperComponent implements AfterContentInit {

  _props: Record<string, unknown>
  @Input() set props(props: Record<string, unknown>) {
    this._props = props;
    this.updateComponentProps(props);
  }
  @Input() configuration: FederationPlugin;

  private reactMFEModule;


  constructor(private hostRef: ElementRef,
              private route: ActivatedRoute,
              private eventBusService: EventBusService,
              private globalNavigationService: GlobalNavigationService
  ) {
  }

  async ngAfterContentInit(): Promise<void> {
    if(!this.configuration) {
      this.route.data
        .pipe(take(1))
        .subscribe(async (data: Data) => {
          const configuration: FederationPlugin = data.configuration;
          await this.renderComponent(configuration, data.props);
        });
    }
    await this.renderComponent(this.configuration, this._props);
  }

  private async renderComponent(configuration: FederationPlugin, props: Record<string, unknown>): Promise<void> {
    this.configuration = configuration;
    const component = await loadRemoteModule({
      remoteEntry: configuration.remoteEntry,
      remoteName: configuration.remoteName,
      exposedModule: configuration.exposedModule
    });
    this.reactMFEModule = component[configuration.moduleName];
    const ReactElement = React.createElement(this.reactMFEModule, this.constructProps({...props, basename: this.configuration.routePath}));
    ReactDOM.render(ReactElement, this.hostRef.nativeElement);
  }

  private updateComponentProps(props: Record<string, unknown>): void {
    const ReactElement = React.createElement(this.reactMFEModule, this.constructProps({...props, basename: this.configuration.routePath}));
    ReactDOM.render(ReactElement, this.hostRef.nativeElement);
  }

  private constructProps(routeProps) {
    if (!routeProps) {
      routeProps = {};
    }
    if (!this._props) {
      this._props = {};
    }

    return {...this.props, ...routeProps, eventBus: this.eventBusService, globalNavigation: this.globalNavigationService};
  }
}
