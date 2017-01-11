import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { DateViewComponent } from './components/date-view/date-view.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, DateViewComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
