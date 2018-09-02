import './UInt8Array';

describe("UInt8Array Prototype: toString", () => {
    it("toString(): Returns string", () => {
        let arr = new Uint8Array([1, 2, 3, 4]);        

        let result = arr.toString();
        expect(result.length).toBe(4);
    });
});
