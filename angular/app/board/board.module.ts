import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardComponent }  from './board.component';
import { CellComponent } from './cell.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ BoardComponent, CellComponent ],
  exports:      [ BoardComponent, CellComponent]
})
export class BoardModule { }
