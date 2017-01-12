import { FootprintType } from './footprint-types';
import '../date-helpers.module';

export class FootprintRecord {
    private footprints?: FootprintType[];

    childName: string;
    recordDate: Date;

    constructor(date: Date, name = 'unspecified') {
        this.footprints = new Array();
        this.childName = name;

        if (date == null) {
            this.recordDate = DateHelpers.Today();
        } else {
            this.recordDate = new Date(date.toDateString());
        }
    }

    hasFootprint(typeResolver: () => FootprintType): boolean {
        let type =  typeResolver();
        let found = this.footprints.find(fp => fp === type);
        return found != null;
    }

    toggleFootprint(typeResolver: () => FootprintType): void {
        let type = typeResolver();
        let index = this.footprints.findIndex(fp => fp === type);
        if (index < 0) {
            this.footprints.push(type);
        } else {
            this.footprints.splice(index, 1);
        }
    }
}
