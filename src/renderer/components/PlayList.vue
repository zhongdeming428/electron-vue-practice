<template>
  <div class="container">
    <span>歌单</span>
    <div class="list-info">
      <img :src="activeSongList.coverImgUrl" width="96px" height="96px" alt="歌单封面" :title="activeSongList.description">
      <div style="padding-left: 2rem">
        <span style="font-size:1.2rem;font-weight:300">{{activeSongList.name}}</span><br>
        <span>分类：</span>
        <span v-for="(item, index) in activeSongList.tags" :key="index">{{' ' + item + ' ' + (index === activeSongList.tags.length - 1 ? '' : '/') + ' '}}</span><br>
        <span>播放次数：{{activeSongList.playCount}}</span><br>
        <span>歌单作者：{{activeSongList.creator.nickname}}</span><br>
        <span>创建时间：{{(new Date(activeSongList.createTime)).toLocaleString()}}</span>
      </div>
    </div>
    <div class="list-detail">
      <Button @click="playAll"><Icon type="md-play"/>播放全部</Button>
      <ul type="none" class="song-list-detail">
        <li v-for="(item, index) in activeSongList.tracks" @dblclick="playSong(index)" class="cursor-pointer" :style="{backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#fff'}" :key="item.id">
          <span style="width:20%">{{index + 1}}</span>
          <span style="text-align:left;width:50%">{{item.name}}</span>
          <span style="float:right">
            <span v-for="(singer, index) in item.ar" :key="singer.id">{{' ' + singer.name + ' ' + (index === item.ar.length - 1 ? '' : '、')}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { Button, Icon } from 'iview';
export default {
  created() {
    console.log(this.activeSongList);
  },
  components: {
    Button, Icon
  },
  computed: {
    ...mapGetters(['activeSongList'])
  },
  methods: {
    ...mapMutations(['SONGLIST_SET_CURRENT']),
    playAll() {
      this.SONGLIST_SET_CURRENT({
        list: this.activeSongList.tracks,
        index: 0
      });
    },
    playSong(index) {
      this.SONGLIST_SET_CURRENT({
        list: this.activeSongList.tracks,
        index
      });
    }
  }
}
</script>

<style scoped>
  .list-info {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 1rem 2rem;
  }
  .list-detail {
    padding: 1rem 2rem;
  }
</style>
