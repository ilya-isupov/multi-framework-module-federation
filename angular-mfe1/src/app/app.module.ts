import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
export const PLUGIN_EVENT_BUS_NAME: string = "pluginEventBus";
export class PluginGlobalEventBusSender extends BroadcastChannel {}
export class PluginGlobalEventBusReceiver extends BroadcastChannel {}

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
      provide: PluginGlobalEventBusSender,
      useValue: new BroadcastChannel(PLUGIN_EVENT_BUS_NAME)
    },
    {
      provide: PluginGlobalEventBusReceiver,
      useValue: new BroadcastChannel(PLUGIN_EVENT_BUS_NAME)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public pluginEventBusReceiver: PluginGlobalEventBusReceiver) {
    this.pluginEventBusReceiver.onmessage = function (event) {
      console.log(event);
    }
  }
}
