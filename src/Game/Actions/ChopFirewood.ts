import { GoapAction } from "@src/Game/AI/GOAP/GoapAction";
import GameObject from "@src/Game/GameObject";

export class ChopFirewood extends GoapAction {
    public workDuration: number = 2;

    private mChopped: boolean = false;
    private mChoppingBlock: GameObject | null = null;
    private mStartTime: number = 0;

    constructor() {
        super();
        this.addPrecondition("hasTool", true);
        this.addPrecondition("hasFirewood", false);
        this.addEffect("hasFirewood", true);
    }

    public reset(): void {
        this.mChopped = false;
        this.mChoppingBlock = null;
        this.mStartTime = 0;
    }

    public isDone(): boolean {
        return this.mChopped;
    }

    public requiresInRange(): boolean {
        return true;
    }

    public checkProceduralPrecondition(agent: GameObject): boolean {
        throw new Error("Method not implemented.");
    }

    public perform(agent: GameObject): boolean {
        throw new Error("Method not implemented.");
    }
}
