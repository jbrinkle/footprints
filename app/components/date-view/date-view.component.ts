import { Component, OnInit } from '@angular/core';
import { FootprintService } from '../../services/footprint.service';
import { FootprintRecord } from '../../models/footprint-record';
import { FootprintType } from '../../models/footprint-types';
import '../../date-helpers.module';

@Component({
  selector: 'footprints-by-date',
  template: `<nav>
                <button *ngIf="showPrevButton()"
                        (click)="goToPreviousDate()">{{getPrevButtonText()}}</button>
                <h3>{{getDateDisplayText()}}</h3>
                <button *ngIf="showNextButton()"
                        (click)="goToNextDate()">{{getNextButtonText()}}</button>
            </nav>
            <div>
            <table>
                <tr>
                    <th></th>
                    <th class='footCol'>Routine</th>
                    <th class='footCol'>Chores</th>
                    <th class='footCol'>Practice</th>
                    <th class='footCol'>School</th>
                    <th class='footCol'>Bonus</th>
                </tr>
                <tr class='entry' *ngFor="let child of children">
                    <td>
                        <h3><a href="#">{{child.childName}}</a></h3>
                    </td>
                    <td><img [class.on]="child.hasFootprint(getFpTypeMorningRoutine)"
                             src='app/assets/single_footprint_wh.png' 
                             alt='Morning routine'
                             (click)="child.toggleFootprint(getFpTypeMorningRoutine)" /></td>
                    <td><img [class.on]="child.hasFootprint(getFpTypeChores)"
                             src='app/assets/single_footprint_wh.png' 
                             alt='Morning routine'
                             (click)="child.toggleFootprint(getFpTypeChores)" /></td>
                    <td><img [class.on]="child.hasFootprint(getFpTypePractice)"
                             src='app/assets/single_footprint_wh.png' 
                             alt='Morning routine'
                             (click)="child.toggleFootprint(getFpTypePractice)" /></td>
                    <td><img [class.on]="child.hasFootprint(getFpTypeSchool)"
                             src='app/assets/single_footprint_wh.png' 
                             alt='Morning routine'
                             (click)="child.toggleFootprint(getFpTypeSchool)" /></td>
                    <td><img [class.on]="child.hasFootprint(getFpTypeBonus)"
                             src='app/assets/single_footprint_wh.png' 
                             alt='Morning routine'
                             (click)="child.toggleFootprint(getFpTypeBonus)" /></td>                    
                </tr>
            </table></div>`,
})
export class DateViewComponent implements OnInit {
    children: FootprintRecord[];

    private currentDate: Date;

    constructor(private footprintService: FootprintService)
    {
        this.currentDate = DateHelpers.Today();
    }

    ngOnInit() {
        this.refreshRecords();
    }

    getPrevButtonText(): String {
        return DateHelpers.GetRelativeLabelForDate(DateHelpers.GetPreviousDay(this.currentDate));
    }

    getNextButtonText(): String {
        return DateHelpers.GetRelativeLabelForDate(DateHelpers.GetNextDay(this.currentDate));
    }

    getDateDisplayText(): String {
        return DateHelpers.GetRelativeLabelForDate(this.currentDate);
    }

    showPrevButton(): boolean {
        return true;
    }

    showNextButton(): boolean {
        return !DateHelpers.IsFuture(DateHelpers.GetNextDay(this.currentDate));
    }

    goToPreviousDate(): void {
        this.currentDate = DateHelpers.GetPreviousDay(this.currentDate);
        this.refreshRecords();
    }

    goToNextDate(): void {
        this.currentDate = DateHelpers.GetNextDay(this.currentDate);
        this.refreshRecords();
    }

    getFpTypeMorningRoutine(): FootprintType { return FootprintType.MorningRoutine; }
    getFpTypeChores(): FootprintType { return FootprintType.Chores; }
    getFpTypePractice(): FootprintType { return FootprintType.Practice; }
    getFpTypeSchool(): FootprintType { return FootprintType.School; }
    getFpTypeBonus(): FootprintType { return FootprintType.Bonus; }

    private refreshRecords(): void {
        let promise = this.footprintService.getFootprintsForDate(this.currentDate);
        if (promise !== undefined) {
            promise.then(records => this.children = records);
        }
    }
}
