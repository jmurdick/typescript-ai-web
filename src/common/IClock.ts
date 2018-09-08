import { IEvent } from "strongly-typed-events";

export interface IClock {
    OnTick(): IEvent<IClock, number>;
}
