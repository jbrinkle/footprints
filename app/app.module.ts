import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { DateViewComponent } from './components/date-view/date-view.component';

import { FootprintService } from './services/footprint.service';
import { LOGGER, LoggerService } from './services/logger.service';
import { SYNC, MockSyncService } from './services/sync.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, DateViewComponent ],
  providers: [ FootprintService,
               { provide: LOGGER, useClass: LoggerService},
               { provide: SYNC, useClass: MockSyncService } ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
