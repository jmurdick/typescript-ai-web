export class Path<T> {
    private mPath: T[];

    constructor() {
        this.mPath = new Array<T>();
    }

    public prepend(node: T) {
        this.mPath.unshift(node);
    }

    public clear() {
        this.mPath = new Array<T>();
    }

    public append(node: T) {
        this.mPath.push(node);
    }

    public *[Symbol.iterator]() {
        for (let i = 0; i < this.mPath.length; i++) {
            yield [i, this.mPath[i]];
        }
    }
}
