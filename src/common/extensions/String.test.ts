import './String';

describe("String Prototype: TrimStart", () => {
    it("trimStart: Trims 1 Character", () => {
        let str = "This is a test";
        let expectedStr = "his is a test";

        let result = str.trimStart("T");
        expect(result).toEqual(expectedStr);
    });

    it("trimStart: Trims More than One Character", () => {
        let str = "TTThis is a test";
        let expectedStr = "his is a test";

        let result = str.trimStart("T");
        expect(result).toEqual(expectedStr);
    });

    it("trimStart: Only trims using 1st Character when multiple are passed", () => {
        let str = "This is a test";
        let expectedStr = "his is a test";

        let result = str.trimStart("Th");
        expect(result).toEqual(expectedStr);
    });
});

describe("String Prototype: TrimEnd", () => {
    it("trimEnd: Trims 1 Character", () => {
        let str = "This is a test";
        let expectedStr = "This is a tes";

        let result = str.trimEnd("t");
        expect(result).toEqual(expectedStr);
    });

    it("trimEnd: Trims More than One Character", () => {
        let str = "This is a testtt";
        let expectedStr = "This is a tes";

        let result = str.trimEnd("t");
        expect(result).toEqual(expectedStr);
    });

    it("trimEnd: Only trims using 1st Character when multiple are passed", () => {
        let str = "This is a test";
        let expectedStr = "This is a tes";

        let result = str.trimEnd("ts");
        expect(result).toEqual(expectedStr);
    });    
});

describe("String prototype: MakeSafeName", () => {
    it("makeSafeName: Replaces invalid string with underscore", () => {
        let str: string = "";

        let result = str.makeSafeName();
        expect(result).toBe("_")
    });

    it("makeSafeName: Replaces whitespace with empty string", () => {
        let str: string = "   ";

        let result = str.makeSafeName();
        expect(result).toBe("");
    });

    it("makeSafeName: Replaces non-word character with underscore", () => {
        let str: string = "this&that";

        let result = str.makeSafeName();
        expect(result).toBe("this_that");
    });

    it("makeSafeName: Replaces first character digit with underscore", () => {
        let str: string = "8letiable";
        
        let result = str.makeSafeName();
        expect(result).toBe("_8letiable");
    });
});