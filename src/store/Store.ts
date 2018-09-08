import Vue from "vue";
import Vuex from "vuex";
import vuexI18n from "vuex-i18n";

import { Message } from "@src/common/models/Message";
import { GameObject } from "@src/Game/GameObject";

Vue.use(Vuex);

// tslint:disable-next-line:no-empty-interface
export interface IRootState {
    messages: Message[];
    gameObjects: GameObject[];
    currentObject: GameObject | null;

    // messageFilter: new MessageQuery(sortBy "field", count)
}

export const Store = new Vuex.Store({
    state: {
        currentObject: null,
        messages: new Array<Message>(),
        gameObjects: new Array<GameObject>(),
    } as IRootState,
    getters: {
        getCurrentObject: (state: IRootState) => state.currentObject,
        getMessages: (state: IRootState) => state.messages,
        getGameObjects: (state: IRootState) => state.gameObjects,
        // getMessageFIlter
        // getMessageCount
    },
    mutations: {
        // messageFilter(state: IRootState, qry: MessageQuery) {
        //  state.messageFilter = qry;
        // }
        selectedObject(state: IRootState, val: GameObject) {
            if (val) {
                const found = state.gameObjects.find((x: GameObject) => x === val);
                if (found) {
                    state.currentObject = found;
                } else {
                    state.currentObject = val;
                }
            } else {
                state.currentObject = val;
            }
        },
        messages(state: IRootState, val: Message[]) {
            state.messages = val;
        },
        entities(state: IRootState, val: GameObject[]) {
            state.gameObjects = val;
        },
    },
    actions: {
        async initializeStore({ state, commit }) {
            const json = [
                {
                    name: "Entity #1",
                    children: [
                        {
                            name: "Sub-Entity #1",
                            children: [],
                        },
                        {
                            name: "Sub-Entity #2",
                            children: [],
                        },
                    ],
                },
                {
                    name: "Entity #2",
                    children: [
                        {
                            name: "Sub-Entity #3",
                            children: [
                                {
                                    name: "Sub-Entity #7",
                                    children: [],
                                },
                                {
                                    name: "Sub-Entity #8",
                                    children: [],
                                },
                            ],
                        },
                        {
                            name: "Sub-Entity #4",
                            children: [],
                        },
                        {
                            name: "Sub-Entity #5",
                            children: [],
                        },
                        {
                            name: "Sub-Entity #6",
                            children: [],
                        },
                    ],
                },
            ];

            commit("gameObjects", json);
        },
        // async toggleMessageSort({ state, commit })
        // async sortMessagesBy
        // async applyMessagesFilter
        async addMessage({ state, commit }, message: Message) {
            commit("messages", message);
        },
        // async toggleEntitySort
        // async sortEntitiesBy
        // async applyEntitiesFIlter
        // async addEntity (commit("entities", state.entities)) commit("currentEntity", added)
        // async updateEntity
        // async selectEntity

    },
    modules: {},
});

Vue.use(vuexI18n.plugin, Store);

export default Store;
