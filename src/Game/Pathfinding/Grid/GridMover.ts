import { PathMover } from "../PathMover";
import { GridNode } from "./GridNode";

export class GridMover implements PathMover {
    public passableFlags!: number;

    private mUserData: object;

    constructor(o: Object) {
        this.mUserData = o;
    }

    public get UserData(): object { return this.mUserData; }

    public canPass(node: GridNode): boolean {
        return (this.passableFlags & node.passableFlags) != 0;
    }
}