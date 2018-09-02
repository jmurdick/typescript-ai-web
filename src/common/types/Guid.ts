export class Guid {
    private uuid: string;

    constructor(input: string) {
        // TODO need to verify the format is 
        if (!Guid.isValidForm(input)) {
            throw Error(`Invalid Guid format for string '${input}'`);
        }

        this.uuid = input;
    }

    private static isValidForm(input: string): boolean {
        let regexp = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", "i");
        return regexp.test(input);
    }

    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    // Public Domain/MIT
    public static newGuid(): Guid {
        let d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }

        return new Guid('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }));
    }

    public toString(): string {
        return this.uuid;
    }

    public static parse(input: string): Guid {
        if (!Guid.isValidForm(input))
            throw Error("Not a valid UUID format");
        return new Guid(input);
    }

    public static empty(): Guid {
        return new Guid("00000000-0000-0000-0000-000000000000");
    }
}