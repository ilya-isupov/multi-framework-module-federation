import {AfterContentInit, Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';
import {FederationPlugin} from "../../microfrontends/microfrontend.model";
import {loadRemoteModule} from "../../utils/federation-utils";
import {ActivatedRoute, Data} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'angular-wrapper',
  template: "<div></div>"
})
export class AngularWrapperComponent implements AfterContentInit {

  constructor(private hostRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute
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

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component[configuration.moduleName]);
        this.hostRef.clear();

        const componentRef = this.hostRef.createComponent(componentFactory);
        componentRef.changeDetectorRef.detectChanges();
      })

  }
}
