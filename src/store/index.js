import { createStore } from "vuex";
import { racesModule } from "@/store/racesModule";
import { authModule } from "@/store/authModule";

export default createStore({
  state: () => ({
    error: null,
  }),
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  modules: {
    races: racesModule,
    auth: authModule,
  },
  namespaced: true,
});
