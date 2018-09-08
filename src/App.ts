import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Log } from "@src/common/util/Log";

Log.EnableTodoLogging = true;

import Engine from "@src/components/Engine";

@Component
export default class App extends Vue {
    public game!: Engine;

    public created() {
        this.game = new Engine();
    }
}
