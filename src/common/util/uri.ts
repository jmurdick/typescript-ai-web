export default class UriHelpers {
    public static toQueryString(obj: any): string {
        return '?' + Object.keys(obj).map(k => k + '=' + encodeURIComponent(obj[k])).join('&');
    }
}
