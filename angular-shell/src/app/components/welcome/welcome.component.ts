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
  reactPluginConfiguration$: Observable<FederationPlugin>;
  reactPluginProps: Record<string, unknown> = {
    basename: '/'
  };

  constructor(private federationPluginService: FederationPluginService) {
  }

  ngOnInit(): void {
    this.routes$ = AppService.getRoutes();
    this.reactPluginConfiguration$ = this.federationPluginService.getRemoteComponentConfiguration('reactExamplePlugin');
  }

  passReactProps(): void {
    this.reactPluginProps = {
      ...this.reactPluginProps,
      count: Math.random()
    };
  }
}
