declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        gridSizeX: number;
        gridSizeY: number;
        aiEventInterval: number;
    }
}

export const Config = {
    gridSizeX: 100,
    gridSizeY: 100,
    aiEventInterval: 250,
};

export default Config;
