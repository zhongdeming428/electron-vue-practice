const eventEmitter = require('../../util/event');

const state = {
  songList: [],    // 所有的推荐歌单
  activeSongList: {},   // 当前正在查看的歌单内容
  currentPlayList: []   // 正在播放的列表
};

const mutations = {
  SONGLIST_SET(state, list) {
    Object.assign(state.songList, list);
  },
  SONGLIST_SET_ACTIVE(state, list) {
    Object.assign(state.activeSongList, list);
  },
  SONGLIST_SET_CURRENT(state, { list, index }) {
    state.currentPlayList = list;
    eventEmitter.emit('startPlay', index);
  }
};

const getters = {
  songList(state) {
    return state.songList;
  },
  activeSongList(state) {
    return state.activeSongList;
  },
  currentPlayList(state) {
    return state.currentPlayList;
  }
};

export default {
  state,
  mutations,
  getters
}