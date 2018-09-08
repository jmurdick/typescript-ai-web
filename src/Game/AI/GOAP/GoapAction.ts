import { GameObject } from "@src/Game/GameObject";
import KeyValuePair from "@src/Game/KeyValuePair";
import { ActionTypes } from "../ActionTypes";

export abstract class GoapAction {
    public cost: number = 1.0;
    public target?: GameObject | null;

    private preconditions!: Array<KeyValuePair<any>>;
    private effects!: Array<KeyValuePair<any>>;
    private mActionType: ActionTypes;
    private inRange: boolean = false;

    public get actionType(): ActionTypes { return this.mActionType; }
    public get Preconditions(): Array<KeyValuePair<any>> { return this.preconditions; }
    public get Effects(): Array<KeyValuePair<any>> { return this.effects; }

    constructor() {
        this.preconditions = new Array<KeyValuePair<any>>();
        this.effects = new Array<KeyValuePair<any>>();
        this.mActionType = ActionTypes.Idle;
    }

    public doReset(): void {
        this.inRange = false;
        this.target = null;
        this.reset();
    }

    public abstract reset(): void;
    public abstract isDone(): boolean;
    public abstract checkProceduralPrecondition(agent: GameObject): boolean;
    public abstract perform(agent: GameObject): boolean;
    public abstract requiresInRange(): boolean;

    public isInRange(): boolean {
        return this.inRange;
    }

    public setInRange(inRange: boolean) {
        this.inRange = inRange;
    }

    public addPrecondition(key: string, value: any) {
        this.preconditions.push(new KeyValuePair<any>(key, value));
    }

    public removePrecondition(key: string) {
        const index = this.preconditions.findIndex((x: KeyValuePair<any>) => x.key === key);
        if (index !== -1) {
            this.preconditions.splice(index, 1);
        }
    }

    public addEffect(key: string, value: any) {
        this.effects.push(new KeyValuePair<any>(key, value));
    }

    public removeEffect(key: string) {
        const index = this.effects.findIndex((x: KeyValuePair<any>) => x.key === key);
        if (index !== -1) {
            this.effects.splice(index, 1);
        }
    }
}
