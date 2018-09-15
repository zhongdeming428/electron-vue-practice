import Vue from "vue";

// 这里存放有关用户的所有资料数据

const state = {
  nickname: '',
  avatarUrl: '',
  isLogin: false,
  userName: '',
  password: '',
  showLoginDialog: false
};

const mutations = {
  USER_UPDATE(state, data) {
    for(let key in data) {
      state[key] = data[key];
    }
  }
};

const actions = {
  login({ commit, state }, data) {
    if (!state.isLogin) {
      commit('USER_UPDATE', {
        showLoginDialog: true
      });
    }
  }
};

const getters = {
  user(state) {
    return Object.assign({}, state);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}