import {AfterContentInit, Component, ComponentFactoryResolver, Input, ViewContainerRef} from '@angular/core';
import {Microfrontend} from "../../microfrontends/microfrontend.model";
import {loadRemoteModule} from "../../utils/federation-utils";

@Component({
  selector: 'angular-wrapper',
  template: "<div #componentContainer class='angular-wrapper'></div>"
})
export class AngularWrapperComponent implements AfterContentInit {
  @Input() configuration!: Microfrontend;

  constructor(private hostRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  async ngAfterContentInit(): Promise<void> {
    const component = await loadRemoteModule({
      remoteEntry: this.configuration.remoteEntry,
      remoteName: this.configuration.remoteName,
      exposedModule: this.configuration.exposedModule
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component[this.configuration.moduleName]);

    const viewContainerRef = this.hostRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
  }
}
