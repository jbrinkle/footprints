import { Component, OnInit } from '@angular/core';
import { KidDayEntry } from '../../models/kidDayEntry';

@Component({
    moduleId: module.id,
    selector: 'kid-day-entry',
    templateUrl: 'kidDayEntry.component.html'
})
export class KidDayEntryComponent implements OnInit {

    get Entry(): KidDayEntry { return this.entry; }

    constructor(private entry: KidDayEntry) { }

    ngOnInit() { }
}