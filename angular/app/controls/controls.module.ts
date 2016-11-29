import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ControlsComponent }  from './controls.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ ControlsComponent ],
  exports:      [ControlsComponent]
})
export class ControlsModule { }
