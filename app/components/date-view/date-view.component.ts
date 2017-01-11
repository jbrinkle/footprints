import { Component, OnInit } from '@angular/core';
import { FootprintRecord } from '../../models/footprint-record';
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
                    <td><img [class.on] = child.getMorningRoutineFootState
                             src='app/assets/single_footprint_wh.png' 
                             alt='Morning routine'
                             (click)="toggleFootprint(child, 'routine')" /></td>
                    <td><img [class.on] = child.getChoresFootState
                             src='app/assets/single_footprint_wh.png' 
                             alt='Chores'
                             (click)="toggleFootprint(child, 'chores')" /></td>
                    <td><img [class.on] = child.getPracticeFootState
                             src='app/assets/single_footprint_wh.png' 
                             alt='Practice'
                             (click)="toggleFootprint(child, 'practice')" /></td>
                    <td><img [class.on] = child.getSchoolFootState
                             src='app/assets/single_footprint_wh.png' 
                             alt='School'
                             (click)="toggleFootprint(child, 'school')" /></td>
                    <td><img [class.on] = child.getBonusFootState
                             src='app/assets/single_footprint_wh.png' 
                             alt='Bonus'
                             (click)="toggleFootprint(child, 'bonus')" /></td>
                </tr>
            </table></div>`,
})
export class DateViewComponent implements OnInit {
    children: FootprintRecord[];

    private currentDate: Date;

    constructor()
    {
        this.currentDate = new Date((new Date(Date.now())).toDateString());
    }

    ngOnInit() {
        this.children = [
            { childName: 'Marli', date: new Date(Date.now()) },
            { childName: 'Michelle', date: new Date(Date.now()) },
            { childName: 'Ada', date: new Date(Date.now()) },
            { childName: 'Amber', date: new Date(Date.now()) }
        ];
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
    }

    goToNextDate(): void {
        this.currentDate = DateHelpers.GetNextDay(this.currentDate);
    }

    toggleFootprint(child: FootprintRecord, code: string)
    {
        if (code === 'routine') {
          child.isMorningRoutineFootOn = !child.isMorningRoutineFootOn;
        } else if (code === 'chores') {
          child.isChoresFootOn = !child.isChoresFootOn;
        } else if (code === 'practice') {
          child.isPracticeFootOn = !child.isPracticeFootOn;
        } else if (code === 'school') {
          child.isSchoolFootOn = !child.isSchoolFootOn;
        } else if (code === 'bonus') {
          child.isBonusFootOn = !child.isBonusFootOn;
        } else {
          throw 'InvalidFootprintCode';
        }
    }
}
