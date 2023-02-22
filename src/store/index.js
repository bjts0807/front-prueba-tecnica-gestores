import { createStore } from "vuex";
import { login,logout, csrfCookie,getAuthenticatedUser } from "../services/loginService";
import router from "../router/index"

const store = createStore({
  state: {
    is_logged : '',
    layout: 'Loading',
    user: null
  },
  mutations: {
    SET_LOGIN_USER(state, user) {
      state.user = user;
    },
    SET_LAYOUT(state, newLayout) {
      state.layout = newLayout
    },
    SET_LOGIN_STATE(state, loginState) {
      state.is_logged = loginState;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        await csrfCookie();
        const userCredentials = await login(credentials);
        commit('SET_LOGIN_USER', userCredentials.data);
        commit('SET_LAYOUT', 'AppLayout');
        commit('SET_LOGIN_STATE', true);
        router.push({
          name : 'Dashboard'
        }) 
      } catch (e) {
        throw {
          'status': e.response.status,
          'error': e.response.error
        }
      }
    },
    async logout({ commit }) {
      await logout();
      commit('SET_LOGIN_USER', null);
      commit('SET_LAYOUT', 'BlankLayout');
      commit('SET_LOGIN_STATE', false);
    },
    async currentUser({ commit }) {
      try {
        let response = await getAuthenticatedUser();

        if (response.data) {
          commit('SET_LOGIN_USER', response.data);
          commit('SET_LAYOUT', 'AppLayout');
          commit('SET_LOGIN_STATE', true);
        } else {
          commit('SET_LOGIN_STATE', false);
          commit('SET_LAYOUT', 'BlankLayout');
        }
      } catch (e) {
        switch (e.response.status) {
          case 401:
            commit('SET_LOGIN_USER', {});
            commit('SET_LOGIN_STATE', false);
            commit('SET_LAYOUT', 'BlankLayout');
          break;
        }
      }
    },
  },
});

export default store;
