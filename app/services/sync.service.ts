import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { FootprintType } from '../models/footprint-types';
import { FootprintRecord } from '../models/footprint-record';
import { LOGGER, ILogger } from './logger.service';
import '../date-helpers.module';

export let SYNC = new OpaqueToken('sync.service');

export interface ISyncService {
    getChildren(): string[];
    getABunchOfRecords(): FootprintRecord[];
}

@Injectable()
export class MockSyncService implements ISyncService {
    private children: string[] = [];

    constructor(@Inject(LOGGER) private logger: ILogger) {
        this.logger.log('Mock Sync Service started...');
    }

    getChildren(): string[] {
        this.children = [ 'Marli', 'Michelle' ];
        return this.children;
    }

    getABunchOfRecords(): FootprintRecord[] {
        let records = Array<FootprintRecord>();

        let today = DateHelpers.Today();

        // today - all kids did morning routine and practiced
        for (let index in this.children) {
            if (this.children.hasOwnProperty(index)) {
                let child = new FootprintRecord(today, this.children[index]);
                child.toggleFootprint(() => FootprintType.MorningRoutine);
                child.toggleFootprint(() => FootprintType.Practice);
                records.push(child);
            }
        }

        // yesterday - most kids did nothing
        today.setDate(today.getDate() - 1);
        let child = new FootprintRecord(today, this.children[0]);
        child.toggleFootprint(() => FootprintType.MorningRoutine);
        child.toggleFootprint(() => FootprintType.Chores);
        records.push(child);

        // two days ago - first kid did nothing
        today.setDate(today.getDate() - 1);
        for (let i = 1; i < this.children.length; i++) {
            child = new FootprintRecord(today, this.children[i]);
            child.toggleFootprint(() => FootprintType.MorningRoutine);
            child.toggleFootprint(() => FootprintType.School);
            records.push(child);
        }

        // a few more days
        for (let i = 0; i < 4; i++) {
            today.setDate(today.getDate() - 1);
            for (let c = 0; c < this.children.length; c++) {
                child = new FootprintRecord(today, this.children[c]);
                child = this.applyRandomFootprints(child);
                records.push(child);
            }
        }

        return records;
    }

    private applyRandomFootprints(record: FootprintRecord): FootprintRecord {
        if (Math.random() > .6) {
            record.toggleFootprint(() => FootprintType.MorningRoutine);
        }
        if (Math.random() > .4) {
            record.toggleFootprint(() => FootprintType.Chores);
        }
        if (Math.random() > .4) {
            record.toggleFootprint(() => FootprintType.Practice);
        }
        if (Math.random() > .4) {
            record.toggleFootprint(() => FootprintType.School);
        }
        if (Math.random() > .1) {
            record.toggleFootprint(() => FootprintType.Bonus);
        }
        return record;
    }
}