import {AfterContentInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import React from 'react';
import ReactDOM from 'react-dom';
import {ActivatedRoute, Data} from "@angular/router";
import {take} from "rxjs/operators";
import {Microfrontend} from "../../microfrontends/microfrontend.model";
import {loadRemoteModule} from "../../utils/federation-utils";


@Component({
    selector: 'react-wrapper',
    template: '<div class="react-wrapper"></div>',
    styles: [":host {height: 100%; overflow: auto;}"]
})
export class ReactWrapperComponent implements OnInit, AfterContentInit {
    @Input() configuration!: Microfrontend;

    constructor(private hostRef: ElementRef,
                private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.setConfiguration();
    }

    private setConfiguration(): void {
        this.route.data.pipe(take(1)).subscribe((data: Data) => {
            this.configuration = data.configuration;
        })
    }

    async ngAfterContentInit(): Promise<void> {
        const component = await loadRemoteModule({
            remoteEntry: this.configuration.remoteEntry,
            remoteName: this.configuration.remoteName,
            exposedModule: this.configuration.exposedModule
        });
        const ReactMFEModule = component[this.configuration.moduleName];
        const hostElement = this.hostRef.nativeElement;
        ReactDOM.render(<ReactMFEModule/>, hostElement);
    }

}
