import Vue from "vue";
import { Store } from '@src/store/Store'
import vuexI18n from 'vuex-i18n';

Vue.use(vuexI18n.plugin, Store);

//Vue.i18n.add