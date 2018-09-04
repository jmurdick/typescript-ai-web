import { PathNode } from "./PathNode";

export class AStarNode<T extends PathNode> {
    protected mNode: T;
    protected mCost: number;
    protected mDepth: number;
    protected mHeuristic: number;
    protected mParent: AStarNode<T> | null;

    constructor(node: T, cost: number, depth: number, parent: AStarNode<T> | null) {
        this.mNode = node;
        this.mCost = cost;
        this.mDepth = depth;
        this.mParent = parent;
        this.mHeuristic = 0;
    }

    public get Node(): T { return this.mNode; }

    public get Cost(): number { return this.mCost; }
    public set Cost(value: number) { this.mCost = value; }

    public get Depth(): number { return this.mDepth; }

    public get Heuristic(): number { return this.mHeuristic; }
    public set Heuristic(value: number) { this.mHeuristic = value; }

    public get Parent(): AStarNode<T> | null { return this.mParent; }
    public set Parent(value: AStarNode<T> | null) { this.mParent = value; }

    public equals(o: object): boolean {
        if (o.isTypeOf(PathNode)) {
            return this.mNode.equals(o);
        }

        if (o.isTypeOf(AStarNode)) {
            const node = o as AStarNode<T>;
            return this.mNode.equals(node.mNode);
        }

        return false;
    }

    public compareTo(node: AStarNode<T>): number {
        if (node.mCost === this.mCost) {
            return 0;
        }
        if (node.mCost < this.mCost) {
            return 1;
        }
        return -1;
    }
}
