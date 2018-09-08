import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import "@src/common/extensions/String";
import { Message } from "@src/common/models/Message";

import Engine from "@src/components/Engine.vue";
import Tree from "@src/components/Tree/Tree.vue";
import { GameObject } from "@src/Game/GameObject";

@Component({
    components: { Tree, Engine },
})
export default class LandingPage extends Vue {
    @Getter("getGameObjects") public GameObjects!: GameObject[];
    @Getter("getMessages") public Messages!: Message[];

    // @Action("Store/addEntity") addEntity: any;

    public get messages(): Message[] {
        return this.Messages;
    }

    public get hasMessages(): boolean {
        return this.Messages.length > 0;
    }

    public get nodes(): GameObject[] {
        return this.GameObjects;
    }

    public showObject(entity: GameObject) {
        alert(entity.name);
    }
}
