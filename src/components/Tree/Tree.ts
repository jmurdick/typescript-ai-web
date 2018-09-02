import Vue from "vue";
import { Component } from "vue-property-decorator";

import Model from "@src/components/Model";
import Node from "./Node.vue";

@Component({
    components: { Node }
})
export default class Tree extends Vue {
    private mData!: Model;

    public get trunk(): Model { return this.mData; }
    public set trunk(value: Model) { this.mData = value; }
}
