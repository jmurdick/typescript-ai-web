declare interface Object {
    getName(): string;
    isTypeOf(type: Function): boolean;
}

Object.prototype.getName = function() { 
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
 };
 
Object.prototype.isTypeOf = function(type: Function): boolean {
    return this.constructor.name == type.getName();
}
