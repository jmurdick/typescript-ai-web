export default class Utils {
    public static isNullOrUndefined(value: any): boolean {
        return value === undefined || value == null;
    }

    public static toJSON<T>(obj: T): string {
        return JSON.stringify(obj);
    }

    public static fromJSON<T>(json: string | null, type: { new(): T; }): T | null {
        if (json == null) {
            return null;
        }
        return Utils.toClass(JSON.parse(json), type);
    }

    public static toClass<T>(obj: any, type: { new(): T; }): T {
        return Object.assign(new type(), obj) as T;
    }

    public static cloneData<T>(obj: T): T {
        const json = JSON.stringify(obj);
        return JSON.parse(json) as T;
    }
}
