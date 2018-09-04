import { Labourer } from "./Labourer";
import KeyValuePair from "@src/Game/KeyValuePair";

export class Blacksmith extends Labourer {
    public createGoalState(): Array<KeyValuePair<any>> {
        const goal = new Array<KeyValuePair<any>>();
        goal.push(new KeyValuePair<any>("collectTools", true));
        return goal;
    }
}