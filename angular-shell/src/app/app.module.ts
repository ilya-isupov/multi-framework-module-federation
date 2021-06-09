import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularWrapperComponent} from "./components/angular-wrapper/angular-wrapper.component";
import {ReactWrapperComponent} from "./components/react-wrapper/react-wrapper.component";
import {FederationPluginService} from "./microfrontends/federation-plugin.service";
import {WelcomeComponent} from './components/welcome/welcome.component';

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
  providers: [FederationPluginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
