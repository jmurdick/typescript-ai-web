import {PageableQuery} from './PageableQuery';

export class FilterQuery extends PageableQuery {
    filter: string = "";
    sortBy: string = "";
    sortAscending: boolean = true;

    public constructor(options?:  {offset?: number, count?: number, filter?: string, sortBy?: string, sortAscending?: boolean}) {
        super(options);
    
        if (options && options.filter) 
            this.filter = options.filter;
        if (options && options.sortBy)
            this.sortBy = options.sortBy;
        if (options && options.sortAscending != null)
            this.sortAscending = options.sortAscending;
    }

    
    public clone() : FilterQuery {
        let lhs = new FilterQuery();
        lhs.offset = this.offset;
        lhs.count = this.count;
        lhs.filter = this.filter;
        lhs.sortBy = this.sortBy;
        lhs.sortAscending = this.sortAscending;
        return lhs;
    }

    doCreateUrl(): string {
        let url = super.doCreateUrl();
        if (this.filter.length == 0 && this.sortBy.length == 0) {
            return url;
        }

        if (url.length > 0) {
            url += "&";
        } else {
            url += "?";
        }

        if (this.filter.length > 0)
            url += `filter=${encodeURI(this.filter)}`;
        if (this.sortBy.length > 0) {
            if (this.filter.length > 0)
                url += '&';
            url += `sortBy=${this.sortBy}&sortAscending=${this.sortAscending}`
        }

        return url;
    }
}