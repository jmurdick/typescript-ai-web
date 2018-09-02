import './Date';

describe("Date Prototype: FormatTimeAsUTC", () => {
    it("formatTimeAsUTC: Outputs correct value", () => {
        let now = new Date("2000-01-01 12:00:00");
        let result = now.formatTimeAsUTC();
        expect(result).toBe(`01JAN2000 ${12+(now.getTimezoneOffset() / 60)}:00:00 UTC`);
    });
});
