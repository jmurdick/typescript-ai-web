import {FilterQuery} from './FilterQuery';

describe("FilterQuery", () => {
    it("createUrl: Returns Default When No Filter Or Sort Is Specified", () => {
        let query = new FilterQuery();
        
        let result = query.createUrl("http://localhost:1234/test");
        expect(result).toBe("http://localhost:1234/test?count=20");
    });

    it("createUrl: Returns Uri with Filter and Sorting Support", () => {
        let query = new FilterQuery();
        query.filter = "This is a test";
        query.sortBy = "Name";
        query.sortAscending = true;

        var result = query.createUrl("http://localhost:1234/test");
        expect(result).toBe("http://localhost:1234/test?count=20&filter=This%20is%20a%20test&sortBy=Name&sortAscending=true");
    });
});
