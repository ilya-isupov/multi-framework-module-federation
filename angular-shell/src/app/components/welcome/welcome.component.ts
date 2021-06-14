import { Component, OnInit } from '@angular/core';
import {FederationPluginService} from "../../microfrontends/federation-plugin.service";
import {Observable} from "rxjs";
import {FederationPlugin} from "../../microfrontends/microfrontend.model";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  routes$: Observable<ReadonlyArray<FederationPlugin>>;

  constructor(private federationPluginService: FederationPluginService) { }

  ngOnInit(): void {
    this.routes$ = this.federationPluginService.loadRoutesConfig();
  }

}
