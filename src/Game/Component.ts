import Entity from "@src/common/models/Entity";
import { EventBus } from "@src/EventBus";
import { IHasComponents } from "@src/Game/Interfaces/IHasComponents";
import { IIsListener } from "@src/Game/Interfaces/IIsListener";

export class Component extends Entity implements IHasComponents, IIsListener {
    public static instantiate(...args: any[]): Component {
        // TODO Finish.  Question, how do I pass in state?
        // TODO On instantiation, call the start() method
        // TODO Arguments must include:
        //      ComponentType?
        //      Parent GameObject or Component (component is added to it)
        //      Name
        //      Any components to add or handle that somewhere else?
        // TODO: Should there be a clone method as well?
        throw Error("Not yet implemented!");
    }

    private mComponents: Component[];
    private mParent!: Component | null;
    private mEnabled!: boolean;

    constructor() {
        super();
        this.mEnabled = false;
        this.mComponents = new Array<Component>();
        EventBus.$on("on-game-tick", this.update);
    }

    public get Parent(): Component | null { return this.mParent; }
    public set Parent(value: Component | null) { this.mParent = value; }

    public get isEnabled(): boolean { return this.mEnabled; }
    public set isEnabled(value: boolean) { this.mEnabled = value; }

    public getComponent(name: string): Component | null {
        const found = this.mComponents.find((x: Component) => x.name === name);
        return found !== undefined ? found : null;
    }
    public getComponentInChildren(name: string): Component | null {
        let found: Component | null = null;
        for (const child of this.mComponents) {
            const comp = child.getComponent(name);
            if (comp != null) {
                found = comp;
                break;
            }
        }
        return found;
    }
    public getComponentInParent(name: string): Component | null {
        if (this.mParent == null) { return null; }
        return this.mParent.getComponent(name);
    }

    public hasComponent(name: string): boolean {
        const found = this.getComponent(name);
        return found !== undefined;
    }

    public addComponent(component: Component): void {
        this.mComponents.push(component);
    }

    public removeComponent(component: Component): void {
        this.mComponents.remove(component);
    }

    public getComponents(): Component[] {
        return this.mComponents;
    }
    public getComponentsInChildren(): Component[] {
        const childComponents = new Array<Component>();
        for (const child of this.mComponents) {
            const comps = child.getComponents();
            for (const comp of comps) {
                childComponents.push(comp);
            }
        }
        return childComponents;
    }
    public getComponentsInParent(): Component[] {
        if (this.mParent == null) { return new Array<Component>(); }
        return this.mParent.getComponents();
    }

    public start(): void {
        /* nothing */
    }
    public update(): void {
        if (!this.isEnabled) { return; }

        /* nothing */
    }
    public reset(): void {
        /* nothing */
    }
}
