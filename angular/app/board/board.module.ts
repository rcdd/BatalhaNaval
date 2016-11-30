import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { BoardPanel }  from './board.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ BoardPanel ],
  exports:      [ BoardPanel]
})

export class BoardPanelModule { }