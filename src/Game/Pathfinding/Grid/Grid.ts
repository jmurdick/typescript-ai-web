import { set, empty, HashMap } from "@typed/hashmap";
import { GridCoordinate } from "./GridCoordinate";
import { GridSquare } from "./GridSquare";
import { Path } from "../Path";

export class Grid {
    private mSquares: HashMap<GridCoordinate, GridSquare>;

    constructor() {
        this.mSquares = empty<GridCoordinate, GridSquare>();
    }

    public addSquare(x: number, y: number, s: GridSquare): void {
        set(new GridCoordinate(x, y), s, this.mSquares);
    }

    public findPath(): Path<GridSquare> {
        return new Path<GridSquare>();
    }
}