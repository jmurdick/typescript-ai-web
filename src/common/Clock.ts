import { EventDispatcher, SignalDispatcher, SimpleEventDispatcher } from "strongly-typed-events";

export class Clock {
    private mOnTick: SignalDispatcher = new SignalDispatcher();
    private mOnSequenceTick: SimpleEventDispatcher<number> = new SimpleEventDispatcher<number>();
    private mOnClockTick: EventDispatcher<Clock, number> = new EventDispatcher<Clock, number>();
    private mTicks: number = 0;

    constructor(public name: string, timeout: number) {
      setInterval(() => {
        this.mTicks += 1;
        this.mOnTick.dispatch();
        this.mOnSequenceTick.dispatch(this.mTicks);
        this.mOnClockTick.dispatch(this, this.mTicks);
      }, timeout);
    }

    public get onTick() {
      return this.mOnTick.asEvent();
    }

    public get onSequenceTick() {
      return this.mOnSequenceTick.asEvent();
    }

    public get onClockTick() {
      return this.mOnClockTick.asEvent();
    }
}
