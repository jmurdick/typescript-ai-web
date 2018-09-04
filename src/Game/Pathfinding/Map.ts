import { PathMover } from "./PathMover";
import { PathNode } from "./PathNode";

export interface Map<M extends PathMover, N extends PathNode> {
    getNeighbors(mover: M, node: N): Array<N>;
    isValid(mover: M, node: N): boolean;
    getCost(mover: M, startNode: N, nextNode: N): number;
    getHeuristic(mover: M, startNode: N, nextNode: N): number;
}
