declare interface String {
    trimStart(charToTrim: string): string;
    trimEnd(charToTrim: string): string;
    makeSafeName(): string;
}

interface StringConstructor {
    isNullOrEmpty(str: string): boolean;
}

String.isNullOrEmpty = (str: string) => !str;

String.prototype.trimStart = function (this: string, charToTrim: string): string {
    if (this.length == 0) return this;
    if (charToTrim.length > 1)
        charToTrim = charToTrim[0];

    charToTrim = charToTrim ? charToTrim : ' ';
    var i = 0;
    for (; i < this.length && this.charAt(i) == charToTrim; i++);
    return this.substring(i);
}

String.prototype.trimEnd = function (this: string, charToTrim: string): string {
    if (this.length == 0) return this;
    if (charToTrim.length > 1)
        charToTrim = charToTrim[0];

    charToTrim = charToTrim ? charToTrim : ' ';
    var i = this.length - 1;
    for (; i >= 0 && this.charAt(i) == charToTrim; i--);
    return this.substring(0, i + 1);
}

String.prototype.makeSafeName = function (this: string): string {
    let s: string = this;

    // if string is invalid, replace with underscore
    s = s || "_";
    // replace whitespace with empty string
    s = s.replace(/\s/g, "");
    // replace non-word characters with underscore
    s = s.replace(/\W/gi, "_");
    // if first character is a digit, prefix with underscore
    if (s.length && RegExp('[0-9]+').test(s.charAt(0))) {
        s = "_" + s;
    }

    return s;
}
