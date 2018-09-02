const DEFAULT_REMOTE_COUNT = 10;

export class PageableQuery {
    public offset: number = 0;
    public count: number = 20;

    public constructor(options?: { offset?: number, count?: number }) {
        if (options && options.offset) {
            this.offset = options.offset;
        }
        if (options && options.count) {
            this.count = options.count;
        }
    }

    public clone(): PageableQuery {
        const lhs = new PageableQuery();
        lhs.offset = this.offset;
        lhs.count = this.count;
        return lhs;
    }

    public createUrl(base: string): string {
        return base + this.doCreateUrl();
    }

    public doCreateUrl(): string {
        if (this.offset > 0 && this.count !== DEFAULT_REMOTE_COUNT) {
            return `?offset=${this.offset}&count=${this.count}`;
        } else if (this.offset > 0) {
            return `?offset=${this.offset}`;
        } else if (this.count !== DEFAULT_REMOTE_COUNT) {
            return `?count=${this.count}`;
        }
        return "";
    }
}
