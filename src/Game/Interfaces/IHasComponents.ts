import { Component } from "@src/Game/Component";

export interface IHasComponents {
    getComponent(name: string): Component | null;
    getComponentInChildren(name: string): Component | null;
    getComponentInParent(name: string): Component | null;

    hasComponent(name: string): boolean;
    addComponent(component: Component): void;
    removeComponent(component: Component): void;

    getComponents(): Component[];
    getComponentsInChildren(): Component[];
    getComponentsInParent(): Component[];
}
