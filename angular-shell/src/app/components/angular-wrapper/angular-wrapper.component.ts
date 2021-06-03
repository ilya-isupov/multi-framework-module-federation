import {AfterContentInit, Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Microfrontend} from "../../microfrontends/microfrontend.model";
import {loadRemoteModule} from "../../utils/federation-utils";
import {ActivatedRoute, Data} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'angular-wrapper',
  template: "<div #componentContainer class='angular-wrapper'></div>"
})
export class AngularWrapperComponent implements AfterContentInit, OnInit {
  @Input() configuration!: Microfrontend;

  constructor(private hostRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.setConfiguration();
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

  private setConfiguration(): void {
    this.route.data.pipe(take(1)).subscribe((data: Data) => {
      this.configuration = data.configuration;
    })
  }
}
