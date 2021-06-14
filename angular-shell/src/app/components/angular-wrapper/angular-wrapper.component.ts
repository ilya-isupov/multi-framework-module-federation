import {AfterContentInit, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {FederationPlugin} from "../../microfrontends/microfrontend.model";
import {loadRemoteModule} from "../../utils/federation-utils";
import {ActivatedRoute, Data} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'angular-wrapper',
  template: "<div class='angular-wrapper'><ng-container #container></ng-container></div>"
})
export class AngularWrapperComponent implements AfterContentInit {
  @Input() configuration: FederationPlugin

  @ViewChild("container", {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute
  ) {
  }

  async ngAfterContentInit(): Promise<void> {
    if (!this.configuration) {
      this.route.data
        .pipe(take(1))
        .subscribe(async (data: Data) => {
          await this.renderComponent(data.configuration);
        })
    }
    await this.renderComponent(this.configuration);
  }

  private async renderComponent(configuration: FederationPlugin): Promise<void> {
    const component = await loadRemoteModule({
      remoteEntry: configuration.remoteEntry,
      remoteName: configuration.remoteName,
      exposedModule: configuration.exposedModule
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component[configuration.moduleName]);
    this.container.clear();

    const componentRef = this.container.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
  }
}
