import { getLocalStorageData, setLocalStorageData } from "@/utils/localStorage";

const allRaces = require("@/mock/users 2021.json");

export const racesModule = {
  state: () => ({
    races: [],
    selectedSort: "",
    sortOptions: [
      { value: "date", name: "Сортировка по дате" },
      { value: "payment", name: "Сортировка по сумме взноса" },
      { value: "distance", name: "Сортировка по дистанции" },
    ],
  }),
  getters: {
    sortedRaces(state) {
      return [...state.races]
        .sort((race1, race2) =>
          state.selectedSort == "date"
            ? new Date(race2[state.selectedSort]) -
              new Date(race1[state.selectedSort])
            : race2[state.selectedSort] - race1[state.selectedSort]
        )
        .map((user) => ({
          ...user,
          date: new Date(user.date)
            .toLocaleDateString("ru-RU")
            .replace(/\./g, "-"),
        }));
    },
  },
  mutations: {
    setRaces(state, races) {
      state.races = races;
    },
    setSelectedSort(state, sortValue) {
      state.selectedSort = sortValue;
    },
    addRace(state, race) {
      state.races.push(race);
    },
  },
  actions: {
    loadRaces({ commit }) {
      let data = getLocalStorageData("races", "users");
      if (!data) data = [];

      commit("setRaces", data.concat(allRaces.users));
      commit("setSelectedSort", "date");
    },

    addRace({ commit }, race) {
      let data = getLocalStorageData("races", "users");
      if (!data) data = [];
      data.push(race);
      setLocalStorageData("races", "users", data);

      commit("addRace", race);
      commit("setError", "Заявка отправлена", { root: true });
    },

    getRace({ state, dispatch }, id) {
      if (state.races.length == 0) dispatch("loadRaces");
      return state.races.filter((race) => race.id === id)[0];
    },

    saveRace({ state, commit }, race) {
      const newData = [state.races.filter((race) => race != race.id), race];
      commit("setRaces", newData);

      let data = getLocalStorageData("races", "users");

      setLocalStorageData(
        "races",
        "users",
        [...data].filter((elem) => race.id != elem.id).concat(race)
      );
    },
  },
  namespaced: true,
};
