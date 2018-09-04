import KeyValuePair from "@src/Game/KeyValuePair";
import { GoapAction } from "./GoapAction";
import Queue from "@src/common/types/Queue";

export default interface IGoap {
    getWorldState(): Array<KeyValuePair<any>>;
    createGoalState(): Array<KeyValuePair<any>>;
    planFailed(failedGoal: Array<KeyValuePair<any>>): void;
    planFound(goal: Array<KeyValuePair<any>>, actions: Queue<GoapAction>): void;
    actionsFinished(): void;
    planAborted(aborter: GoapAction): void;
    moveAgent(nextAction: GoapAction): boolean;
}
