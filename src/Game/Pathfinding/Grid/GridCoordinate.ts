export class GridCoordinate {
    private mX: number;
    private mY: number;

    constructor(x: number, y: number) {
        this.mX = x;
        this.mY = y;
    }

    public get x(): number { return this.mX; }
    public get y(): number { return this.mY; }
}