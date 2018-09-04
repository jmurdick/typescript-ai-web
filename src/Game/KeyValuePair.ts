export default class KeyValuePair<T> {
    private mKey: string;
    private mValue: T;

    public get key(): string { return this.mKey; }
    public get value(): T { return this.mValue; }

    constructor(key: string, value: T) {
        this.mKey = key;
        this.mValue = value;
    }
}
