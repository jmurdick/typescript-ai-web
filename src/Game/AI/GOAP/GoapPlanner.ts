import Queue from "@src/common/types/Queue";
import GameObject from "@src/Game/GameObject";
import KeyValuePair from "@src/Game/KeyValuePair";
import { GoapAction } from "./GoapAction";
import { Node } from "./Node";

export default class GoapPlanner {
    public plan(agent: GameObject, availableActions: GoapAction[], worldState: Array<KeyValuePair<any>>,
                goal: Array<KeyValuePair<any>>) {

        for (const a of availableActions) {
            a.doReset();
        }

        const usableActions = new Array<GoapAction>();
        for (const a of availableActions) {
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
        for (const leaf of leaves) {
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
        for (const a of result) {
            queue.push(a);
        }

        return queue;
    }

    private buildGraph(parent: Node, leaves: Node[], usableActions: GoapAction[],
                       goal: Array<KeyValuePair<any>>) {

        let foundOne: boolean = false;

        for (const action of usableActions) {
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

    private actionSubset(actions: GoapAction[], removeMe: GoapAction) {
        const subset = new Array<GoapAction>();

        for (const a of actions) {
            if (a !== removeMe) {
                subset.push(a);
            }
        }

        return subset;
    }

    private inState(test: Array<KeyValuePair<any>>, state: Array<KeyValuePair<any>>): boolean {
        let allMatch = true;

        for (const t of test) {
            let match = false;
            for (const s of state) {
                if (s === t) {
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

        for (const s of currentState) {
            state.push(new KeyValuePair<any>(s.key, s.value));
        }

        for (const change of stateChange) {
            let exists = false;

            for (const s of state) {
                if (s === change) {
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
