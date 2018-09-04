import IGoap from "@src/Game/AI/GOAP/IGoap";
import KeyValuePair from "@src/Game/KeyValuePair";
import { Backpack } from "@src/Game/Objects/Backpack";
import { GoapAction } from "@src/Game/AI/GOAP/GoapAction";
import Queue from "@src/common/types/Queue";
import GameObject from "@src/Game/GameObject";
import { Tool } from "@src/Game/Objects/Tool";

export abstract class Labourer extends GameObject implements IGoap {
    public backpack!: Backpack;
    public moveSpeed: number = 1;

    public start() {
		if (this.backpack == null) {
			this.backpack = new Backpack();
		}
		if (this.backpack.tool == null) {
			this.backpack.tool = new Tool();
		}
    }

    public update() {

    }

    public getWorldState(): Array<KeyValuePair<any>> {
        const worldData = new Array<KeyValuePair<any>>();
        
        worldData.push(new KeyValuePair<any>("hasOre", (this.backpack.numOre > 0)));
        worldData.push(new KeyValuePair<any>("hasLogs", (this.backpack.numLogs > 0)));
        worldData.push(new KeyValuePair<any>("hasFirewood", (this.backpack.numFirewood > 0)));
        worldData.push(new KeyValuePair<any>("hasTool", (this.backpack.tool != null)));

        return worldData;
    }

    public abstract createGoalState(): Array<KeyValuePair<any>>;

    public planFailed(failedGoal: Array<KeyValuePair<any>>): void {
        // Not handling this here since we are making sure our goals will always succeed.
		// But normally you want to make sure the world state has changed before running
		// the same goal again, or else it will just fail.
    }

    public planFound(goal: Array<KeyValuePair<any>>, actions: Queue<GoapAction>) {
        // Yay we found a plan for our goal
        // Debug.Log ("<color=green>Plan found</color> "+GoapAgent.prettyPrint(actions));
    }

	public actionsFinished(): void {
		// Everything is done, we completed our actions for this gool. Hooray!
		// Debug.Log ("<color=blue>Actions completed</color>");
	}

	public planAborted(aborter: GoapAction): void {
		// An action bailed out of the plan. State has been reset to plan again.
		// Take note of what happened and make sure if you run the same goal again
		// that it can succeed.
		// Debug.Log ("<color=red>Plan Aborted</color> "+GoapAgent.prettyPrint(aborter));
	}

	public moveAgent(nextAction: GoapAction): boolean {
		// move towards the NextAction's target

		// TODO Fix this!
		// float step = moveSpeed * Time.deltaTime;
		// gameObject.transform.position = Vector3.MoveTowards(gameObject.transform.position, nextAction.target.transform.position, step);
		
		// if (gameObject.transform.position.Equals(nextAction.target.transform.position) ) {
		// 	// we are at the target location, we are done
		// 	nextAction.setInRange(true);
		// 	return true;
		// } else
		// 	return false;
		return false;
	}
}