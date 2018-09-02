import Vue from "vue";
import Model from "@src/components/Model";

export default class Node extends Vue {
    private mNode!: Model;
    private mIsOpen: boolean = false;

    public get node(): Model { return this.mNode; }
    public set node(value: Model) { this.mNode = value; }

    public get isOpen(): boolean { return this.mIsOpen; }

    public isFolder(): boolean {
        return this.mNode.children && this.mNode.children.length > 0;
    }

    public toggle(): void {
        if (this.isFolder) {
            this.mIsOpen = !this.mIsOpen;
        }
    }

    public changeType(): void {
        if (!this.isFolder) {
            this.mNode.children = [];
            this.addChild();
            this.mIsOpen = true;
        }
    }

    public addChild(): void {
        const model = new Model();
        model.name = "new node";
        this.mNode.children.push(model);
    }
}
