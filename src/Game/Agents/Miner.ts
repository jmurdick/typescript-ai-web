import KeyValuePair from "@src/Game/KeyValuePair";
import { Labourer } from "./Labourer";

export class Miner extends Labourer {
    public createGoalState(): Array<KeyValuePair<any>> {
        const goal = new Array<KeyValuePair<any>>();
        goal.push(new KeyValuePair<any>("collectOre", true));
        return goal;
    }
}
