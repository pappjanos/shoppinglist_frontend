import Vue from "vue";
import Vuex from "vuex";
import user from "./user/index";
import general from "./general/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    general,
  },
});
