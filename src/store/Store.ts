import Vue from "vue";
import Vuex from "vuex";
import vuexI18n from "vuex-i18n";

Vue.use(Vuex);

// tslint:disable-next-line:no-empty-interface
export interface IRootState { /* nothing */ }

export const Store = new Vuex.Store({
    state: {} as IRootState,
    mutations: {},
    getters: {},
    actions: {},
    modules: {},
});

Vue.use(vuexI18n.plugin, Store);
