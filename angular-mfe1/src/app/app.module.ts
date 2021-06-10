import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
export const PLUGIN_EVENT_BUS_NAME: string = "pluginEventBus";
export class PluginGlobalEventBusProducer extends BroadcastChannel {}
export class PluginGlobalEventBusConsumer extends BroadcastChannel {}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
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
  constructor(public pluginEventBusReceiver: PluginGlobalEventBusConsumer) {
    this.pluginEventBusReceiver.onmessage = function (event) {
      console.log(event);
    }
  }
}
