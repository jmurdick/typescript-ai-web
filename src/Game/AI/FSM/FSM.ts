import { Stack } from "@src/common/types/Stack";
import { GameObject } from "@src/Game/GameObject";

export type FSMFunction = (fsm: FSM, gameObject: GameObject) => void;

export class FSM {
    public stateStack: Stack<FSMFunction> = new Stack<FSMFunction>();

    public FSMStateFunction!: FSMFunction;

    public update(gameObject: GameObject) {
        const state = this.stateStack.peek();
        if (state !== undefined) {
            state(this, gameObject);
        }
    }

    public pushState(state: FSMFunction) {
        this.stateStack.push(state);
    }

    public popState() {
        this.stateStack.pop();
    }
}
