import KeyValuePair from "@src/Game/KeyValuePair";
import { GoapAction } from "./GoapAction";

export class Node {
    public parent: Node | null;
    public runningCost: number;
    public state: Array<KeyValuePair<any>>;
    public action: GoapAction | null;

    public constructor(parent: Node | null, runningCost: number, state: Array<KeyValuePair<any>>, action: GoapAction | null) {
        this.parent = parent;
        this.runningCost = runningCost;
        this.state = state;
        this.action = action;
    }
}
