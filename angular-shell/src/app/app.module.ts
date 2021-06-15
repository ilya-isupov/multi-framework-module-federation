import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularWrapperComponent} from './components/angular-wrapper/angular-wrapper.component';
import {ReactWrapperComponent} from './components/react-wrapper/react-wrapper.component';
import {FederationPluginService} from './microfrontends/federation-plugin.service';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {EventBusService} from './microfrontends/event-bus.service';
import {GlobalNavigationService} from './microfrontends/global-navigation.service';

@NgModule({
  declarations: [
    AppComponent,
    AngularWrapperComponent,
    ReactWrapperComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    FederationPluginService,
    {
      provide: 'GLOBAL_EVENT_BUS',
      useClass: EventBusService
    },
    {
      provide: 'GLOBAL_NAVIGATION_SERVICE',
      useClass: GlobalNavigationService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
