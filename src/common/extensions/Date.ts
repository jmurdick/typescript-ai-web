declare interface Date {
    formatTimeAsUTC(): string;
}

Date.prototype.formatTimeAsUTC = function (this: Date): string {
    const pad = (n: number, d: number) => {
        return ("000000" + n.toString()).substr(-d);
    };

    // TODO this is a placeholder example. better to use an actual library
    const dayOfMonth = this.getUTCDate();
    const month = this.getUTCMonth();
    const year = this.getUTCFullYear();
    const hour = this.getUTCHours();
    const minute = this.getUTCMinutes();
    const second = this.getUTCSeconds();
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${pad(dayOfMonth, 2)}${months[month]}${pad(year, 4)} ${pad(hour, 2)}:${pad(minute, 2)}:${pad(second, 2)} UTC`;
};
