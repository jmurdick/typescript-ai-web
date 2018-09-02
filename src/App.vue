<template>
  <div>
    <modals-container/>
    <div>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Log } from "@src/common/util/Log";

Log.EnableTodoLogging = true;

import Config from "../config";
import { InjectArguments } from "good-injector-vue";
import { setTimeout } from "timers";
import { Action, Getter } from "vuex-class";

@Component({
  components: { }
})
export default class App extends Vue {
}
</script>
<style src="./Main.css" />
