const state = {
  songList: []
};

const mutations = {
  SONGLIST_SET(state, list) {
    state.songList = list;
  }
};

const getters = {
  songList(state) {
    return state.songList;
  }
};

export default {
  state,
  mutations,
  getters
}