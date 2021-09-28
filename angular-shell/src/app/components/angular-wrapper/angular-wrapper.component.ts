import {
  AfterContentInit,
  Compiler,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {loadRemoteModule} from '../../utils/federation-utils';
import {FederationPlugin} from '../../microfrontends/microfrontend.model';

@Component({
  selector: 'angular-mf-adapter',
  template: '<div class=\'angular-mf-adapter\'><ng-container #container></ng-container></div>'
})
export class AngularWrapperComponent implements AfterContentInit {
  @Input() configuration: FederationPlugin;
  @Output() outputs: EventEmitter<Record<string, EventEmitter<any>>> = new EventEmitter();
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  inputsBeforeComponentCreate: Record<string, unknown> = {};
  inputsInternal: Record<string, unknown> = {};
  private componentReference: ComponentRef<any>;
  private isOutputsRegistered = false;
  private componentInputs: Array<string>;
  private componentOutputs: Array<string>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private compiler: Compiler,
              private injector: Injector) {
  }

  @Input() set inputs(props: Record<string, unknown>) {
    this.inputsInternal = props;
    this.setProps();
  }

  async ngAfterContentInit(): Promise<void> {
    await this.renderComponent();
  }

  private async renderComponent(): Promise<void> {
    const configuration = this.configuration;
    if (configuration) {
      const component = await loadRemoteModule({
        remoteEntry: configuration.remoteEntry,
        remoteName: configuration.remoteName,
        exposedModule: configuration.exposedModule
      });

      switch (configuration.subType) {
        case 'componentModule': {
          this.compiler.compileModuleAndAllComponentsAsync(component[configuration.moduleClassName])
            .then(async (module) => {
              const moduleReference = module.ngModuleFactory.create(this.injector);
              const innerComponent = await loadRemoteModule({
                remoteEntry: configuration.remoteEntry,
                remoteName: configuration.remoteName,
                exposedModule: configuration.exposedComponent
              });
              // TODO: Can cache compiled modules to reuse they in second time
              const moduleInjectorComponentFactory = moduleReference
                .componentFactoryResolver
                .resolveComponentFactory(innerComponent[configuration.componentClassName]);
              this.saveInputsOutputs(moduleInjectorComponentFactory);
              if (moduleInjectorComponentFactory) {
                this.createComponent(moduleInjectorComponentFactory);
              }
            });
          break;
        }
        case 'component': {
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component[configuration.componentClassName]);
          this.saveInputsOutputs(componentFactory);
          this.createComponent(componentFactory);
          break;
        }
      }
    }
  }

  private saveInputsOutputs(componentFactory: ComponentFactory<unknown>): void {
    this.componentInputs = componentFactory.inputs.map((input) => input.templateName);
    this.componentOutputs = componentFactory.outputs.map((output) => output.templateName);
  }

  private createComponent(componentFactory: ComponentFactory<any>): void {
    this.container.clear();
    this.componentReference = this.container.createComponent(componentFactory);
    this.setProps();
  }

  private setProps(): void {
    if (this.componentReference?.instance) {
      const eventEmitters: Record<string, EventEmitter<any>> = {};
      for (const propName in this.componentReference.instance) {
        if (this.componentOutputs.includes(propName)) {
          eventEmitters[propName] = this.componentReference.instance[propName];
        }
      }
      const props = {...this.inputsInternal, ...this.inputsBeforeComponentCreate};
      for (const propName in props) {
        if (this.componentInputs.includes(propName)) {
          this.componentReference.instance[propName] = props[propName];
          this.componentReference.changeDetectorRef.markForCheck();
        }
      }
      if (!this.isOutputsRegistered) {
        this.outputs.emit(eventEmitters);
        this.isOutputsRegistered = true;
      }
      this.inputsBeforeComponentCreate = {};
    } else {
      this.inputsBeforeComponentCreate = {
        ...this.inputsBeforeComponentCreate,
        ...this.inputsInternal
      };
    }
  }
}
