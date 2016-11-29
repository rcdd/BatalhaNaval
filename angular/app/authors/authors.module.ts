import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthorsComponent }  from './authors.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AuthorsComponent ],
  exports:      [AuthorsComponent]
})
export class AuthorsModule { }
