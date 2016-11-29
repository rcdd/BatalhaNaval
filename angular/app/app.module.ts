import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { BoardModule } from './board/board.module'
import { ControlsModule } from './controls/controls.module'
import { AuthorsModule } from './authors/authors.module'

@NgModule({
  imports:      [ BrowserModule, BoardModule, ControlsModule,AuthorsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
