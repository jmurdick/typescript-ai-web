declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        gridSizeX: number;
        gridSizeY: number;
        gameTickInterval: number;
    }
}

export const Config = {
    gridSizeX: 100,
    gridSizeY: 100,
    gameTickInterval: 250,
};

export default Config;
