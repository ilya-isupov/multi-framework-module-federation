import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessComponent} from './business/business.component';
import {BusinessRoutingModule} from './business-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NotesService} from './notes.service';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    BusinessComponent
  ],
  exports: [
    BusinessComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    NotesService
  ]
})
export class BusinessModule {
}
