import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
    @Prop({ default: "" })
    public title!: string;

    @Prop({default : true})
    public withHeader: boolean = true;

    @Prop({default : true})
    public withBody: boolean = true;

    @Prop({default : true})
    public withFooter: boolean = true;

    public constructor() {
        super();
    }
}
