import Queue from "@src/common/types/Queue";
import { ActionTypes } from "@src/Game/AI/ActionTypes";
import { FSM, FSMFunction } from "@src/Game/AI/FSM/FSM";
import GameObject from "@src/Game/GameObject";
import KeyValuePair from "@src/Game/KeyValuePair";
import { GoapAction } from "./GoapAction";
import GoapPlanner from "./GoapPlanner";
import IGoap from "./IGoap";

export default class GoapAgent extends GameObject {
    public static prettyPrintState(state: Array<KeyValuePair<any>>): string {
        let s = "";
        for (const kvp of state) {
            s += `${kvp.key}:${kvp.value.toString()}, `;
        }
        return s;
    }
    public static prettyPrintQueue(actions: Queue<GoapAction>): string {
        let s = "";
        for (const a of actions) {
            s += `${typeof a}-> `;
        }
        s += "GOAL";
        return s;
    }
    public static prettyPrintArray(actions: GoapAction[]): string {
        let s = "";
        for (const a of actions) {
            s += `${typeof a}, `;
        }
        return s;
    }
    public static prettyPrint(action: GoapAction): string {
        return `${typeof action}`;
    }

    private stateMachine!: FSM;

    private idleState!: FSMFunction ;
    private moveToState!: FSMFunction ;
    private performActionState!: FSMFunction ;

    private availableActions!: GoapAction[];
    private currentActions!: Queue<GoapAction>;

    private dataProvider!: IGoap;
    private planner!: GoapPlanner;

    constructor() {
        super();
    }

    public start(): void {
        this.stateMachine = new FSM();
        this.availableActions = new Array<GoapAction>();
        this.currentActions = new Queue<GoapAction>();
        this.planner = new GoapPlanner();

        this.findDataProvider();
        this.createIdleState();
        this.createMoveToState();
        this.createPerformActionState();
        this.stateMachine.pushState(this.idleState);
        this.loadActions();
    }

    public update(): void {
        this.stateMachine.update(this);
    }

    public addAction(a: GoapAction) {
        this.availableActions.push(a);
    }

    public getAction(type: ActionTypes): GoapAction | null {
        for (const g of this.availableActions) {
            if (g.actionType === type) {
                return g;
            }
        }
        return null;
    }

    public removeAction(action: GoapAction) {
        const index = this.availableActions.findIndex((x: GoapAction) => x === action);
        if (index !== -1) {
            this.availableActions.splice(index, 1);
        }
    }

    private hasActionPlan(): boolean {
        return this.currentActions.count > 0;
    }

    private createIdleState(): void {
        const self = this;
        this.idleState = (fsm: FSM, gameObj: GameObject) => {
            const worldState = self.dataProvider.getWorldState();
            const goal = self.dataProvider.createGoalState();

            const plan = self.planner.plan(gameObj, self.availableActions, worldState, goal);
            if (plan != null) {
                self.currentActions = plan;
                self.dataProvider.planFound(goal, plan);
                fsm.popState();
                fsm.pushState(self.performActionState);
            } else {
                // Debug.Log("<color=orange>Failed Plan:</color>"+prettyPrint(goal));
                self.dataProvider.planFailed(goal);
                fsm.popState();
                fsm.pushState(self.idleState);
            }
        };
    }

    private createMoveToState(): void {
        const self = this;
        this.moveToState = (fsm: FSM, gameObj: GameObject) => {
            const action = self.currentActions.peek();
            if (action === undefined) {
                return;
            }
            if (action.requiresInRange() && action.target == null) {
                // Debug.Log("<color=red>Fatal error:</color> Action requires a target but has none. Planning failed. You did not assign the target in your Action.checkProceduralPrecondition()");
                fsm.popState(); // move
                fsm.popState(); // perform
                fsm.pushState(self.idleState);
                return;
            }

            if (self.dataProvider.moveAgent(action)) {
                fsm.popState();
            }

            /*MovableComponent movable = (MovableComponent) gameObj.GetComponent(typeof(MovableComponent));
			if (movable == null) {
				Debug.Log("<color=red>Fatal error:</color> Trying to move an Agent that doesn't have a MovableComponent. Please give it one.");
				fsm.popState(); // move
				fsm.popState(); // perform
				fsm.pushState(idleState);
				return;
			}
			float step = movable.moveSpeed * Time.deltaTime;
			gameObj.transform.position = Vector3.MoveTowards(gameObj.transform.position, action.target.transform.position, step);
			if (gameObj.transform.position.Equals(action.target.transform.position) ) {
				// we are at the target location, we are done
				action.setInRange(true);
				fsm.popState();
			}*/
        };
    }

    private createPerformActionState(): void {
        const self = this;
        this.performActionState = (fsm: FSM, gameObj: GameObject) => {
            if (!self.hasActionPlan()) {
                // Debug.Log("<color=red>Done actions</color>");
                fsm.popState();
                fsm.pushState(self.idleState);
                self.dataProvider.actionsFinished();
                return;
            }

            let action = self.currentActions.peek();
            if (action === undefined) {
                return;
            }

            if (action.isDone()) {
                self.currentActions.pop();
            }

            if (self.hasActionPlan()) {
                action = self.currentActions.peek();
                if (action === undefined) {
                    return;
                }

                const inRange = action.requiresInRange() ? action.isInRange() : true;
                if (inRange) {
                    const success = action.perform(gameObj);
                    if (!success) {
                        fsm.popState();
                        fsm.pushState(self.idleState);
                        self.dataProvider.planAborted(action);
                    }
                } else {
                    fsm.pushState(self.moveToState);
                }
            } else {
                fsm.popState();
                fsm.pushState(self.idleState);
                self.dataProvider.actionsFinished();
            }
        };
    }

    private findDataProvider(): void {
        // TODO
		// foreach (Component comp in gameObject.GetComponents(typeof(Component)) ) {
		// 	if ( typeof(IGoap).IsAssignableFrom(comp.GetType()) ) {
		// 		dataProvider = (IGoap)comp;
		// 		return;
		// 	}
		// }
    }

    private loadActions(): void {
        // TODO
		// GoapAction[] actions = gameObject.GetComponents<GoapAction>();
		// foreach (GoapAction a in actions) {
		// 	availableActions.Add (a);
		// }
		// Debug.Log("Found actions: "+prettyPrint(actions));
    }
}
