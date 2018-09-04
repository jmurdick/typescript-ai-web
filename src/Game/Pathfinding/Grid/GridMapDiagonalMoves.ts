import { GridMap } from "./GridMap";
import { GridMover } from "./GridMover";
import { GridNode } from "./GridNode";

export class GridMapDiagonalMoves extends GridMap {
    constructor() {
        super();
    }

    public getNeighbors(mover: GridMover, node: GridNode): Array<GridNode> {
        let neighbors = new Array<GridNode>();
        this.addPassableNode(mover, neighbors, node.x+1, node.y+1);
        this.addPassableNode(mover, neighbors, node.x+1, node.y);
        this.addPassableNode(mover, neighbors, node.x+1, node.y-1);

        this.addPassableNode(mover, neighbors, node.x, node.y+1);
        this.addPassableNode(mover, neighbors, node.x, node.y-1);

        this.addPassableNode(mover, neighbors, node.x-1, node.y+1);
        this.addPassableNode(mover, neighbors, node.x-1, node.y);
        this.addPassableNode(mover, neighbors, node.x-1, node.y-1);

        return neighbors;
    }
}