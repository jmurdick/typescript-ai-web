import Vue from "vue";
import Vuex from "vuex";
import vuexI18n from "vuex-i18n";

import { Message } from "@src/common/models/Message";
import Entity from "@src/components/Entity";

Vue.use(Vuex);

// tslint:disable-next-line:no-empty-interface
export interface IRootState { 
    messages: Array<Message>;
    entities: Array<Entity>;
    currentEntity: Entity | null;

    //messageFilter: new MessageQuery(sortBy "field", count)
}

export const Store = new Vuex.Store({
    state: {
        currentEntity: null,
        messages: new Array<Message>(),
        entities: new Array<Entity>(),
    } as IRootState,
    getters: {
        getCurrentEntity: (state: IRootState) => state.currentEntity,
        getMessages: (state: IRootState) => state.messages,
        getEntities: (state: IRootState) => state.entities,
        // getMessageFIlter
        // getMessageCount
    },
    mutations: {
        //messageFilter(state: IRootState, qry: MessageQuery) {
        //  state.messageFilter = qry;
        //}
        selectedEntity(state: IRootState, val: Entity) {
            if (val) {
                const found = state.entities.find(x => x == val);
                state.currentEntity = found ? found : null;
            } else {
                state.currentEntity = val;
            }
        },
        messages(state: IRootState, val: Array<Message>) {
            state.messages = val;
        },
        entities(state: IRootState, val: Array<Entity>) {
            state.entities = val;
        }
    },
    actions: {
        async initializeStore({ state, commit }) {
            const json = [
                {
                    "name": "Entity #1",
                    "children": [
                        {
                            "name": "Sub-Entity #1",
                            "children": []
                        },
                        {
                            "name": "Sub-Entity #2",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "Entity #2",
                    "children": [
                        {
                            "name": "Sub-Entity #3",
                            "children": [
                                {
                                    "name": "Sub-Entity #7",
                                    "children": []
                                },
                                {
                                    "name": "Sub-Entity #8",
                                    "children": []
                                }   
                            ]
                        },
                        {
                            "name": "Sub-Entity #4",
                            "children": []
                        },
                        {
                            "name": "Sub-Entity #5",
                            "children": []
                        },
                        {
                            "name": "Sub-Entity #6",
                            "children": []
                        }
                    ]
                }
            ];

            commit("entities", json);
        }
        // async toggleMessageSort({ state, commit })
        // async sortMessagesBy
        // async applyMessagesFilter
        // async addMessage
        
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
