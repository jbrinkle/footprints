import { Injectable, Inject } from '@angular/core';
import { FootprintType } from '../models/footprint-types';
import { FootprintRecord } from '../models/footprint-record';
import { SYNC, ISyncService } from './sync.service';
import { LOGGER, ILogger } from './logger.service';
import '../date-helpers.module';

@Injectable()
export class FootprintService {
    private isInit: boolean;
    private children: string[];
    private records: FootprintRecord[] = [];

    constructor(@Inject(SYNC) private syncsvc: ISyncService,
                @Inject(LOGGER) private logger: ILogger) {
        this.logger.log('FootprintService started...');
    }

    getFootprintsForDate(filterDate: Date): Promise<FootprintRecord[]> {
        // return array of records for specified date
        this.ensureInit();

        let records: FootprintRecord[] = [];

        if (filterDate == null) {
            filterDate = DateHelpers.Today();
        }

        this.logger.log('Getting footprints for date ' + filterDate.toDateString());

        for (let i = 0; i < this.records.length; i++) {
            let record = this.records[i];

            if (record.recordDate.valueOf() < filterDate.valueOf()) {
                this.logger.log('Record search by date finished because no future records can meet criteria.');
                break;
            }

            if (record.recordDate.valueOf() === filterDate.valueOf()) {
                records.push(record);
            }
        }

        this.logger.log('Found ' + ((records != null) ? records.length : 0) + ' record(s)');
        return Promise.resolve(records);
    }

    getFootprintsForChild(child: String): Promise<FootprintRecord[]> {
        // return array of records for specified child
        return null;
    }

    setFootprintForChild(record: FootprintRecord): void {
        // update repository
    }

    private ensureInit(): void {
        if (this.isInit) {
            return;
        }

        // see "Act on the Promise":  https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
        this.children = this.syncsvc.getChildren();
        this.records = this.syncsvc.getABunchOfRecords();
        this.logger.log('FootprintService initialized...');
        this.isInit = true;
    }
}