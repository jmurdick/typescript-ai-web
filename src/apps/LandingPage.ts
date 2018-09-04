import Vue from "vue";
import { Component } from "vue-property-decorator";

import "@src/common/extensions/String";
import { Message } from "@src/common/models/Message";

import Tree from "@src/components/Tree/Tree.vue";
import Entity from "@src/common/models/Entity";

import { Getter, Action } from "vuex-class";

@Component({
    components: { Tree },
})
export default class LandingPage extends Vue {
    @Getter("getEntities") Entities!: Entity[];
    @Getter("getMessages") Messages!: Message[];

    //@Action("Store/addEntity") addEntity: any;

    public get messages(): Message[] {
        return this.Messages;
    }

    public get hasMessages(): boolean {
        return this.Messages.length > 0;
    }

    public get nodes(): Entity[] {
        return this.Entities;
    }

    public showEntity(entity: Entity) {
        alert(entity.name);
    }
}
