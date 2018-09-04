import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import Entity from "@src/common/models/Entity";

@Component({})
export default class Tree extends Vue {
    @Prop()
    public nodes!: Entity[];

    @Prop()
    public label!: string;

    @Prop()
    public depth!: number;

    private mShowChildren: boolean = false;
    public get showChildren() { return this.mShowChildren; }
    public set showChildren(val: boolean) { this.mShowChildren = val; }

    public get iconClasses(): string {
        return this.showChildren ? "fa-minus-square-o" : "fa-plus-square-o";
    }

    public get labelClasses(): string { 
        return this.nodes ? "has-children" : "";
    }

    public get indent(): string { 
        return `translate(${this.depth * 50}px)`;
    }

    public toggleChildren() {
        this.showChildren = !this.showChildren;
    }
}
