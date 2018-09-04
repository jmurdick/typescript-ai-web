import { PathNode } from "../PathNode";

export class GridNode implements PathNode {
    public x!: number;
    public y!: number;
    public passableFlags!: number;

    public equals(o: Object): boolean {
        if (!o.isTypeOf(GridNode)) return false;
        const node = o as GridNode;
        return (this.x == node.x && this.y == node.y);
    }
}
