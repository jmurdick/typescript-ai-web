import {Guid} from './Guid';

describe("Guid type: constructor", () => {
    it("constructor: throws error when given bad guid", () => {
        let value: string = "this-is-not-a-valid-guid";

        expect(() => new Guid(value))
            .toThrowError(`Invalid Guid format for string '${value}'`);
    });
});

describe("Guid type: newGuid", () => {
    it("newGuid: returns a value", () => {
        let result = Guid.newGuid();
        expect(result).not.toBeNull();
    });
});

describe("Guid type: empty", () => {
    it("empty: returns a value", () => {
        let result = Guid.empty();
        expect(result.toString()).toBe("00000000-0000-0000-0000-000000000000");
    });
});

describe("Guid type: parse", () => {
    it("parse: returns guid object when given valid guid", () => {
        let value: string = "043bd841-6831-488f-99ce-aa9a0a5180bc";

        let result = Guid.parse(value);
        expect(result).not.toBeNull();
    });

    it("parse: throws error when given bad guid", () => {
        let value: string = "this-is-not-a-valid-guid";

        expect(() => Guid.parse(value)).toThrowError("Not a valid UUID format");
    });
});
