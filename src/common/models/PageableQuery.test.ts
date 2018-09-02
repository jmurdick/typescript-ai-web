import {PageableQuery} from './PageableQuery';

describe("PageableQuery", () => {
    it("createUrl: Returns Default Route", () => {
        let query = new PageableQuery();
        
        let result = query.createUrl("http://localhost:1234/test");
        expect(result).toBe("http://localhost:1234/test?count=20");
    });

    it("createUrl: Returns Uri with Paging", () => {
        let query = new PageableQuery();
        query.offset = 5;
        query.count = 22;

        var result = query.createUrl("http://localhost:1234/test");
        expect(result).toBe("http://localhost:1234/test?offset=5&count=22");
    });
});
