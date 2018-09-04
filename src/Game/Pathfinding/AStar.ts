import { PathMover } from "./PathMover";
import { PathNode } from "./PathNode";
import { Path } from "./Path";
import { AStarNode } from "./AStarNode";
import { entries, set, empty, HashMap } from "@typed/hashmap";
import { Map } from "./Map";

export function getNodeFromMap<N extends PathNode>(key: N, map: HashMap<N, AStarNode<N>>): AStarNode<N> | null {
    for (let entry of entries(map)) {
        if (entry["0"] == key) {
            return entry["1"];
        }
    }
    return null;
}

export class AStar<M extends PathMover, N extends PathNode> {
    public findPath(mover: M, map: Map<M, N>, startNode: N, endNode: N, maxSearchDepth: number): Path<N> | null {
        if (!map.isValid(mover, startNode)) {
            return null;
        }

        if (!map.isValid(mover, endNode)) {
            return null;
        }

        let closed = new Array<AStarNode<N>>();
        let open = new Array<AStarNode<N>>();
        let allNodes = empty<N, AStarNode<N>>();

        let startAStarNode = new AStarNode<N>(startNode, 0, 0, null);
        open.push(startAStarNode);

        let targetNode: AStarNode<N> | null = null;
        let maxDepth = 0;

        while ((maxDepth < maxSearchDepth) && (open.length != 0)) {
            let current: AStarNode<N> = open[0];
            if (current.equals(endNode)) {
                targetNode = current;
                break;
            }

            open.remove(current);
            closed.push(current);

            let neighbors = map.getNeighbors(mover, current.Node);
            for(let node of neighbors) {
                if (!map.isValid(mover, node)) {
                    continue;
                }

                let neighbor = getNodeFromMap(node, allNodes);
                if (neighbor == null) {
                    neighbor = new AStarNode<N>(node, 0, 0, null);
                    set(node, neighbor, allNodes);
                }

                let nextStepCost = current.Cost + map.getCost(mover, current.Node, neighbor.Node);
                if (nextStepCost < neighbor.Cost) {
                    if (open.has(neighbor)) {
                        open.remove(neighbor);
                    }
                    if (closed.has(neighbor)) {
                        closed.remove(neighbor);
                    }
                }

                if (!open.has(neighbor) && !closed.has(neighbor)) {
                    neighbor.Cost = nextStepCost;
                    neighbor.Heuristic = map.getHeuristic(mover, current.Node, endNode);
                    neighbor.Parent = current;
                    maxDepth = Math.max(maxDepth, current.Depth+1);
                    open.push(neighbor);
                }
            }
        }

        if (targetNode == null) {
            return null;
        }

        let path = new Path<N>();
        let target: AStarNode<N> | null = targetNode;
        while (target != null) {
            path.prepend(target.Node);
            target = target.Parent;
        }

        return path;
    }
}