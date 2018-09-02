import { Container, GoodInjectorPlugin } from "good-injector-vue";
import Vue from "vue";
import vueHeadful from "vue-headful";
import VModal from "vue-js-modal";

// import { ConnectionWrapper, SignalRConnection } from "@src/Connection";
import { IoCContainer } from "@src/IoCContainer";
import { Store } from "@src/store/Store";
import App from "./App.vue";
import rtr from "./router";

// Vue.prototype.$connection = SignalRConnection;
Vue.use(VModal, { dynamic: true, dialog: true });

IoCContainer.registerThings();

Vue.use(GoodInjectorPlugin, { container: IoCContainer.Container });

// See https://vuejs.org/v2/api/#Global-Config
// Turn off the console warning message about production mode vs developer mode
Vue.config.productionTip = false;
// Set true to enable some profiling features to show up in the Performance tab of Chrome dev tools
Vue.config.performance = false;

Vue.component("vue-headful", vueHeadful);

// tslint:disable-next-line:no-unused-expression
new Vue({
    el: "#app",
    router: rtr,
    store: Store,
    template: "<App/>",
    components: { App },
});

// Container wasn't declared in the typing so added it
// https://github.com/MisterGoodcat/good-injector-vue/issues/1
declare module "vue/types/vue" {
    // tslint:disable-next-line:interface-name
    interface Vue {
        readonly $container: Container;
        // readonly $connection: ConnectionWrapper;
    }
}
