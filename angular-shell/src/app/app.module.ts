import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularWrapperComponent} from "./components/angular-wrapper/angular-wrapper.component";
import {ReactWrapperComponent} from "./components/react-wrapper/react-wrapper.component";
import {FederationPluginService} from "./microfrontends/federation-plugin.service";
import {WelcomeComponent} from './components/welcome/welcome.component';
import {
  PluginGlobalEventBusConsumer,
  PluginGlobalEventBusProducer
} from "../../../angular-mfe1/src/app/app.module";

export const PLUGIN_EVENT_BUS_NAME: string = "pluginEventBus";

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
      provide: PluginGlobalEventBusProducer,
      useValue: new BroadcastChannel(PLUGIN_EVENT_BUS_NAME)
    },
    {
      provide: PluginGlobalEventBusConsumer,
      useValue: new BroadcastChannel(PLUGIN_EVENT_BUS_NAME)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
