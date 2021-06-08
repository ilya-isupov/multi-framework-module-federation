import {AfterContentInit, Component, ElementRef} from '@angular/core';
import React from 'react';
import ReactDOM from 'react-dom';
import {ActivatedRoute, Data} from "@angular/router";
import {take} from "rxjs/operators";
import {FederationPlugin} from "../../microfrontends/microfrontend.model";
import {loadRemoteModule} from "../../utils/federation-utils";


@Component({
  selector: 'react-wrapper',
  template: '',
  styles: [":host {height: 100%; overflow: auto;}"]
})
export class ReactWrapperComponent implements AfterContentInit {

  constructor(private hostRef: ElementRef,
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
        const ReactMFEModule = component[configuration.moduleName];
        const hostElement = this.hostRef.nativeElement;
        ReactDOM.render(<ReactMFEModule/>, hostElement);
      })
  }

}
