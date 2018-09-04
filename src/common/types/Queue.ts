export default class Queue<T> {
    private _store: Array<T> = new Array<T>();

    public push(val: T) {
        this._store.push(val);
    }

    public pop(): T | undefined {
        return this._store.shift();
    }

    public peek(): T | undefined {
        return this._store[this._store.length - 1];
    }
    
    public get count(): number { return this._store.length; }

    public *[Symbol.iterator]() {
        for(let i=0; i<this._store.length; i++) {
            yield [i, this._store[i]];
        }
    }
}
