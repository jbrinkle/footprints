import { Component, OnInit } from '@angular/core';
import { KidDayEntryComponent } from './components/KidDayEntry/kidDayEntry.component';

@Component({
  selector: 'footprints',
  template: `<table>
              <tr><th>Name</th><th>Morning</th><th>Chores</th><th>School</th><th>Practice</th><th>Bonus</th></tr>
              <kid-day-entry [Entry]={}></kid-day-entry>
             </table>`,
})
export class AppComponent implements OnInit { 
  name = 'Angular';
  kid: KidDayEntryComponent = new KidDayEntryComponent('Marli');

  ngOnInit() {
    this.kid.Chores = true;
    this.kid.School = true;
  }
}
