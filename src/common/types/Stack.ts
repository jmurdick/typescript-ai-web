export class Stack<T> {
    private _store: Array<T> = new Array<T>();

    public push(val: T) {
        this._store.push(val);
    }

    public peek(): T | undefined {
        return this._store[this._store.length - 1];
    }

    public pop(): T | undefined {
        return this._store.pop();
    }
}
