import { PathMover } from "../PathMover";
import { GridNode } from "./GridNode";

export class GridMover implements PathMover {
    public passableFlags!: number;

    private mUserData: object;

    constructor(o: object) {
        this.mUserData = o;
    }

    public get UserData(): object { return this.mUserData; }

    public canPass(node: GridNode): boolean {
        // tslint:disable-next-line:no-bitwise
        return (this.passableFlags & node.passableFlags) !== 0;
    }
}
