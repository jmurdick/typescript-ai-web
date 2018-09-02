declare interface Date {
    formatTimeAsUTC(): string;
}

Date.prototype.formatTimeAsUTC = function (this: Date): string {
    let pad = function (n: number, d: number) {
        return ("000000" + n.toString()).substr(-d);
    }

    // TODO this is a placeholder example. better to use an actual library
    let dayOfMonth = this.getUTCDate();
    let month = this.getUTCMonth();
    let year = this.getUTCFullYear();
    let hour = this.getUTCHours();
    let minute = this.getUTCMinutes();
    let second = this.getUTCSeconds();
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${pad(dayOfMonth, 2)}${months[month]}${pad(year, 4)} ${pad(hour, 2)}:${pad(minute, 2)}:${pad(second, 2)} UTC`;
}