import Vue from "vue";
import { Mixin } from "vue-mixin-decorator";

import "@src/common/extensions/String";
import { Guid } from "@src/common/types/Guid";
import { EventBus } from "@src/EventBus";

/** Base class for all components providing common helper utilities */
@Mixin
export default class BaseMixin extends Vue {
    private componentGuid: string = Guid.newGuid().toString();
    get myGuid(): string {
        return this.componentGuid;
    }

    /** Returns the ref name of the component or empty string; ie the string assigned to the 'ref' attribute of the component when used in a template. */
    public get refName(): string {
        const ref = Object.keys(this.$parent.$refs).find((k: any) => this.$parent.$refs[k] === this);
        return !this.$parent ? "" : (ref || "");
    }

    // ? TODO add a 'qualifiedRefName': gets the dot-notation chain of refName from root to leaf

    /** Returns the name of the component; ie the class name */
    public get componentName(): string {
        return this.$options.name || "";
    }

    /** Returns the strongly-typed child DOM component instance with the given name previously registered via the 'ref' attribute and stored in this.$refs */
    public ref<T>(name: string): T {
        return (this.$refs[name] as any) as T;
    }

    /** Emits multiple platform events in a single call:
     * Emits 'event' on $this for strong binding to the event in the template.
     * Emits 'COMPONENT.event' on the event bus where COMPONENT is the reflected component name so any listener
     * can respond to a specific event from a specific component type.
     * Emits 'REF.event' on the event bus where REF is the ref name (ie ref="name") of the component used in a template so any listener
     * can respond to a specific event from a specific named component instance.
     * In all cases, the 'this' of the component that is emitting the event is the first argument, followed by whatever
     * additional arguments are provided by the event emitter.
     */
    public cascadeEmit(event: string, ...args: any[]): void {
        this.$emit(event, this, ...args);
        EventBus.$emit(`${this.componentName}.${event}`, this, ...args);
        const ref = this.refName;
        if (ref) {
            EventBus.$emit(`${ref}.${event}`, this, ...args);
        }
    }
}
