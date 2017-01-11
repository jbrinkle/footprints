import { Component } from '@angular/core';
import { DateViewComponent } from './components/date-view/date-view.component';

@Component({
  selector: 'footprints',
  template: `<footprints-by-date *ngIf="showByDate"></footprints-by-date>`,
})
export class AppComponent  {
  showByDate: boolean;

  constructor() {
    this.showByDate = true;
  }
}
