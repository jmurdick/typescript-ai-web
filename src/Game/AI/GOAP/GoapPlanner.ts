import { GoapAction } from "./GoapAction";
import GameObject from "@src/Game/GameObject";
import KeyValuePair from "@src/Game/KeyValuePair";
import { Node } from "./Node";
import Queue from "@src/common/types/Queue";

export default class GoapPlanner {
    plan(agent: GameObject, availableActions: Array<GoapAction>, worldState: Array<KeyValuePair<any>>, 
        goal: Array<KeyValuePair<any>>) {

        for(let a of availableActions) {
            a.doReset();
        }

        const usableActions = new Array<GoapAction>();
        for(let a of availableActions) {
            if (a.checkProceduralPrecondition(agent)) {
                usableActions.push(a);
            }
        }

        const leaves = new Array<Node>();

        const start = new Node(null, 0, worldState, null);
        const success = this.buildGraph(start, leaves, usableActions, goal);
        if (!success) {
            // todo log it!
            return null;
        }

        let cheapest: Node | null = null;
        for(let leaf of leaves) {
            if (cheapest == null) {
                cheapest = leaf;
            } else {
                if (leaf.runningCost < cheapest.runningCost) {
                    cheapest = leaf;
                }
            }
        }

        const result = new Array<GoapAction>();
        let n = cheapest;
        while (n != null) {
            if (n.action != null) {
                result.insertAt(0, n.action);
            }
            n = n.parent;
        }

        const queue = new Queue<GoapAction>();
        for(let a of result) {
            queue.push(a);
        }

        return queue;
    }

    private buildGraph(parent: Node, leaves: Array<Node>, usableActions: Array<GoapAction>, 
        goal: Array<KeyValuePair<any>>) {
        
        let foundOne: boolean = false;

        for(let action of usableActions) {
            if (this.inState(action.Preconditions, parent.state)) {
                const currentState = this.populatestate(parent.state, action.Effects);
                const node = new Node(parent, parent.runningCost, currentState, action);

                if (this.inState(goal, currentState)) {
                    leaves.push(node);
                    foundOne = true;
                } else {
                    const subset = this.actionSubset(usableActions, action);
                    const found = this.buildGraph(node, leaves, subset, goal);
                    if (found) {
                        foundOne = true;
                    }
                }
            }
        }

        return foundOne;
    }

    private actionSubset(actions: Array<GoapAction>, removeMe: GoapAction) {
        const subset = new Array<GoapAction>();

        for(let a of actions) {
            if (a != removeMe) {
                subset.push(a);
            }
        }

        return subset;
    }

    private inState(test: Array<KeyValuePair<any>>, state: Array<KeyValuePair<any>>): boolean {
        let allMatch = true;

        for(let t of test) {
            let match = false;
            for(let s of state) {
                if (s == t) {
                    match = true;
                    break;
                }
            }

            if (!match) {
                allMatch = false;
            }
        }

        return allMatch;
    }

    private populatestate(currentState: Array<KeyValuePair<any>>, stateChange: Array<KeyValuePair<any>>): Array<KeyValuePair<any>> {
        const state = new Array<KeyValuePair<any>>();

        for(let s of currentState) {
            state.push(new KeyValuePair<any>(s.key, s.value));
        }

        for(let change of stateChange) {
            let exists = false;

            for(let s of state) {
                if (s == change) {
                    exists = true;
                    break;
                }
            }

            if (exists) {
                // remove from state where the keys of key and change intersect
                const updated = new KeyValuePair<any>(change.key, change.value);
                state.push(updated);
            } else {
                state.push(new KeyValuePair<any>(change.key, change.value));
            }
        }

        return state;
    }
}