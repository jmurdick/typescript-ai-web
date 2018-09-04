import KeyValuePair from "@src/Game/KeyValuePair";
import { Labourer } from "./Labourer";

export class Logger extends Labourer {
    public createGoalState(): Array<KeyValuePair<any>> {
        const goal = new Array<KeyValuePair<any>>();
        goal.push(new KeyValuePair<any>("collectLogs", true));
        return goal;
    }
}
