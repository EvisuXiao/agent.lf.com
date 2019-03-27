import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import * as user from './user';
import * as common from './common';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: {}
  },
  modules: {
    user,
    common
  },
  getters,
  actions,
  mutations
});
