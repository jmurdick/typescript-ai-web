declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        serviceUrl: string;
    }
}

export const Config = {
    serviceUrl: window.serviceUrl ? window.serviceUrl : window.location.origin,
};

export default Config;
