import {Component, OnInit} from '@angular/core';
import {Microfrontend} from "./microfrontends/microfrontend.model";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";
import {MicrofrontendService} from "./microfrontends/microfrontend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  routes$: Observable<ReadonlyArray<Microfrontend>>;

  constructor(private microfrontendService: MicrofrontendService) {
  }

  ngOnInit(): void {
    this.routes$ = this.microfrontendService.loadRoutesConfig().pipe(shareReplay(1));
  }
}
