import { Labourer } from "./Labourer";
import KeyValuePair from "@src/Game/KeyValuePair";

export class WoodCutter extends Labourer {
    public createGoalState(): Array<KeyValuePair<any>> {
        const goal = new Array<KeyValuePair<any>>();
        goal.push(new KeyValuePair<any>("collectFirewood", true));
        return goal;
    }
}