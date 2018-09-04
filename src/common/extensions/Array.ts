declare interface Array<T> {
    insertAt<T>(index: number, ...args: T[]): Array<T>;
    remove<T>(item: T): Array<T>;
    has<T>(item: T): boolean;
}

Array.prototype.insertAt = function<T>(index: number, ...args: T[]) {
    this.splice(index, 0, ...args);
    return this;
}

Array.prototype.remove = function<T>(item: T) {
    let index = this.findIndex(d => d == item);
    this.splice(index, 1);
    return this;
}

Array.prototype.has = function<T>(item: T): boolean {
    let index = this.findIndex(d => d == item);
    return index > -1;
}