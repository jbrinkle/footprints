module DateHelpers {
    // someday wrap this in a builder: http://jacwright.com/projects/javascript/date_format/
    let shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    export function Today() {
        return new Date((new Date(Date.now())).toDateString());
    }

    export function GetFriendlyDateFormat(d: Date) {
        let day = shortDays[d.getDay()];
        let month = shortMonths[d.getMonth()];

        return day + ', ' + month + ' ' + d.getDate();
    }

    export function IsPast(d: Date) {
        let today = Today();
        let pval = new Date(d.toDateString());
        return (pval.valueOf() - today.valueOf()) < 0;
    }

    export function GetPreviousDay(d: Date) {
        let day = d.getDate() - 1;
        let newDate = new Date(d.toDateString());
        newDate.setDate(day);
        return newDate;
    }

    export function IsFuture(d: Date) {
        let today = Today();
        let pval = new Date(d.toDateString());
        return (pval.valueOf() - today.valueOf()) > 0;
    }

    export function GetNextDay(d: Date) {
        let day = d.getDate() + 1;
        let newDate = new Date(d.toDateString());
        newDate.setDate(day);
        return newDate;
    }

    export function GetRelativeLabelForDate(d: Date) {
        let today = Today();
        let pval = new Date(d.toDateString());

        let dayDiff = Math.floor((pval.valueOf() - today.valueOf()) / 86400000);

        switch (dayDiff) {
            case -1: return 'Yesterday';
            case 0: return 'Today';
            case 1: return 'Tomorrow';
        }

        let dayName = shortDays[pval.getDay()];

        if (dayDiff < 0 && dayDiff >= -7) {
            return 'Last ' + dayName;
        }

        if (dayDiff > 0 && dayDiff <= 7) {
            return 'Next ' + dayName;
        }

        return GetFriendlyDateFormat(d);
    }
}