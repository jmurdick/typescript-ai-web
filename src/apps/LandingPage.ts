import Vue from "vue";
import { Component } from "vue-property-decorator";

import "@src/common/extensions/String";
import { Message } from "@src/common/models/Message";

import Tree from "@src/components/Tree/Tree.vue";
import Model from "@src/components/Model";

@Component({
    components: { Tree },
})
export default class LandingPage extends Vue {
    private mMessages: Message[] = new Array<Message>();
    private mTreeData!: Model;

    public get messages(): Message[] {
        return this.mMessages;
    }

    public get hasMessages(): boolean {
        return this.mMessages.length > 0;
    }

    public get treeData(): Model {
        return this.mTreeData;
    }

    public created() {
        this.mTreeData = JSON.parse("{\"name\":\"My Tree\",\"children\":[{\"name\":\"hello\"},{\"name\":\"wat\"},{\"name\":\"child folder\",\"children\":[{\"name\":\"child folder\",\"children\":[{\"name\":\"hello\"},{\"name\":\"wat\"}]},{\"name\":\"hello\"},{\"name\":\"wat\"},{\"name\":\"child folder\",\"children\":[{\"name\":\"hello\"},{\"name\":\"wat\"}]}]}]}") as Model;
    }
}
