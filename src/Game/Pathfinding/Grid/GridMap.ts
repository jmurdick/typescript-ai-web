import { empty, entries, HashMap, remove, set, size } from "@typed/hashmap";
import { AStar } from "../AStar";
import { Path } from "../Path";
import { GridMover } from "./GridMover";
import { GridNode } from "./GridNode";

export type GridColumn = HashMap<number, GridNode>;
export function getColumnFromMap(key: number, map: HashMap<number, GridColumn>): GridColumn | null {
    for (const entry of entries(map)) {
        if (entry["0"] === key) {
            return entry["1"];
        }
    }
    return null;
}
export function getNodeFromMap(key: number, map: HashMap<number, GridNode>): GridNode | null {
    for (const entry of entries(map)) {
        if (entry["0"] === key) {
            return entry["1"];
        }
    }
    return null;
}

export abstract class GridMap extends Map<GridMover, GridNode> {
    private mRows: HashMap<number, GridColumn>;
    private mWidth: number = 0;
    private mHeight: number = 0;

    constructor() {
        super();
        this.mRows = empty<number, GridColumn>();
    }

    public get Width(): number { return this.mWidth; }
    public get Height(): number { return this.mHeight; }

    public getNode(x: number, y: number): GridNode | null {
        const column = getColumnFromMap(y, this.mRows);
        if (column == null) {
            return null;
        }
        const node = getNodeFromMap(x, column);
        return node;
    }

    public addGridNode(node: GridNode) {
        let column = getColumnFromMap(node.y, this.mRows);
        if (column == null) {
            column = empty<number, GridNode>();
            set(node.y, column, this.mRows);
        }

        this.mWidth = node.x > this.mWidth ? node.x : this.mWidth;
        this.mHeight = node.y > this.mHeight ? node.y : this.mHeight;
        set(node.x, node, column);
    }

    public addNode(x: number, y: number, passableFlags: number) {
        let node = this.getNode(x, y);
        if (node == null) {
            node = new GridNode();
        }

        node.x = x;
        node.y = y;
        node.passableFlags = passableFlags;
        this.addGridNode(node);
    }

    public removeNode(x: number, y: number) {
        const column = getColumnFromMap(y, this.mRows);
        if (column == null) {
            return;
        }

        remove(x, column);
        if (size(column) === 0) {
            remove(y, this.mRows);
        }
    }

    public findPath(mover: GridMover, startNode: GridNode, endNode: GridNode, maxSearchDepth: number): Path<GridNode> | null {
        const aStar = new AStar<GridMover, GridNode>();
        return aStar.findPath(mover, this, startNode, endNode, maxSearchDepth);
    }

    public abstract getNeighbors(mover: GridMover, node: GridNode): GridNode[];

    public isValid(mover: GridMover, node: GridNode): boolean {
        const n = this.getNode(node.x, node.y);
        if (n == null) {
            return false;
        }
        return mover.canPass(n);
    }

    public getCost(mover: GridMover, startNode: GridNode, endNode: GridNode): number {
        return Math.abs(startNode.x - endNode.x) + Math.abs(startNode.y - endNode.y);
    }

    public getHeuristic(mover: GridMover, startNode: GridNode, endNode: GridNode): number {
        return Math.abs(startNode.x - endNode.x) + Math.abs(startNode.y - endNode.y);
    }

    protected addPassableNode(mover: GridMover, neighbors: GridNode[], x: number, y: number) {
        const n = this.getNode(x, y);
        if (n == null) {
            return;
        }
        if (!mover.canPass(n)) {
            return;
        }
        neighbors.push(n);
    }
}
