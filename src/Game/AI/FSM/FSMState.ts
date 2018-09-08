import { GameObject } from "@src/Game/GameObject";
import { FSM } from "./FSM";

export interface FSMState {
    update(fsm: FSM, gameObject: GameObject): void;
}
