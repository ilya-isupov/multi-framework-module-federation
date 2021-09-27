import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularWrapperComponent} from './components/angular-wrapper/angular-wrapper.component';
import {FederationPluginService} from './microfrontends/federation-plugin.service';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {EventBusService} from './microfrontends/event-bus.service';
import {GlobalNavigationService} from './microfrontends/global-navigation.service';
import {VueWrapperComponent} from './components/vue-wrapper/vue-wrapper.component';
import {SelfRunWrapperComponent} from './components/self-run-wrapper/self-run-wrapper.component';
import {ReactWrapperModule} from './modules/react-wrapper/react-wrapper.module';

@NgModule({
  declarations: [
    AppComponent,
    AngularWrapperComponent,
    SelfRunWrapperComponent,
    VueWrapperComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactWrapperModule
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
    },
    {
      provide: 'GLOBAL_SERVICES',
      useFactory: () => {
      }
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
