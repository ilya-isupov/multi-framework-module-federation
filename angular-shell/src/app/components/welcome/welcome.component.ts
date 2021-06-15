import {Component, OnInit} from '@angular/core';
import {FederationPluginService} from '../../microfrontends/federation-plugin.service';
import {Observable} from 'rxjs';
import {FederationPlugin} from '../../microfrontends/microfrontend.model';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  routes$: Observable<ReadonlyArray<FederationPlugin>>;

  ngOnInit(): void {
    this.routes$ = AppService.getRoutes();
  }

}
