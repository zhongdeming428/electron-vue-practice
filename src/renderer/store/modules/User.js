// 这里存放有关用户的所有资料数据

const state = {
  nickName: '',
  avatarUrl: ''
};

const mutations = {
  USER_UPDATE(state, data) {
    state = Object.assign({}, state, data);
  }
};

const actions = {
  login({ commit }, data) {
    
  }
};