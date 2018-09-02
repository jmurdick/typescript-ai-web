declare interface Uint8Array {
    toString(arr: Uint8Array): string;
}

Uint8Array.prototype.toString = function (this: Uint8Array): string {
    let out: string = '';
    for (let i = 0, length = this.length; i < length; i += 1) {
        out += String.fromCharCode(this[i]);
    }
    return out;
}