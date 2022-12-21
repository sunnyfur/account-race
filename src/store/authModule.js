import { getLocalStorageData, setLocalStorageData } from "@/utils/localStorage";
const getToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};
export const authModule = {
  state: () => ({
    isAuth: false,
    isAgree: false,
    race: {
      name: "",
      birthday: getToday(),
      email: "",
      phone: "",
      distance: "",
      payment: "",
    },
    user: {
      id: "",
      login: "",
    },
  }),
  getters: {},
  mutations: {
    setIsAuth(state, bool) {
      state.isAuth = bool;
    },
    setIsAgree(state, bool) {
      state.isAgree = bool;
    },
    setRace(state, race) {
      if (race) {
        state.race = race;
      } else {
        state.race = {
          name: "",
          birthday: getToday(),
          email: "",
          phone: "",
          distance: "",
          payment: "",
        };
      }
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    registerUser({ commit }, user) {
      commit("setIsAgree", false);
      let data = getLocalStorageData("races", "logins");

      if (!data) data = [];
      if (data.filter((elem) => elem.login === user.login)[0]) {
        throw new Error("Пользователь уже зарегистрирован");
      } else {
        data.push(user);

        setLocalStorageData("races", "logins", data);
      }
      commit("setUser", {
        id: "",
        login: "",
      });
    },
    registerRace({ state, commit, dispatch }, params) {
      //toDO вызвать функцию другого стейта
      const date = new Date();
      dispatch(
        "races/addRace",
        { ...params.race, id: date, date: date },
        { root: true }
      );

      if (params.isAgree) {
        commit("setUser", {
          ...state.user,
          id: date,
          login: params.race.email,
        });
        commit("setIsAgree", params.isAgree);
      }
      commit("setRace");
    },
    async loginUser({ commit, dispatch }, user) {
      const data = getLocalStorageData("races", "logins");
      if (!data) throw new Error("Нет зарегистрированных пользователей");
      const userCorrect = data.filter((elem) => elem.login === user.login)[0];

      if (!userCorrect) throw new Error("Нет пользователя с таким логином");
      if (userCorrect.password !== user.password)
        throw new Error("Пароль не верен");
      const race = await dispatch("races/getRace", userCorrect.id, {
        root: true,
      });

      commit("setRace", race);
      commit("setIsAuth", true);
    },
    saveRace({ commit, dispatch }, params) {
      commit("setIsAuth", false);
      dispatch("races/saveRace", params.race, {
        root: true,
      });
    },
  },
  namespaced: true,
};
