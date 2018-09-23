<template>
  <div class="container">
    <div class="main-menu">
      <div class="right-border main-menu-item">
        <router-link to="/personlize/fm">
          <div class="border-circle cursor-pointer">
            <Icon type="md-radio" size="35"/>
          </div>
        </router-link>
      </div>
      <div class="right-border main-menu-item">
        <router-link to="/personlize/list">
          <div class="border-circle cursor-pointer">
            <span style="font-size:2rem;font-weight:100">16</span>
          </div>
        </router-link>
      </div>
      <div class="main-menu-item">
        <router-link to="/personlize/rankList">
          <div class="border-circle cursor-pointer">
            <Icon type="md-stats" size="35"/>
          </div>
        </router-link>
      </div>
    </div>
    <div class="personlize-list">
      <span class="second-title">
        推荐歌单
      </span>
      <div class="song-list-collection">
        <div v-for="song in songList12" :key="song.id" class="song-list cursor-pointer">
          <div @click="() => {listClick(song.id)}" :style="{position: 'relative',width: '100%',height: '100%', background: `url('${song.picUrl}') no-repeat`,backgroundSize: 'cover'}">
            <span style="position:absolute;bottom:3px;right:3px;color:white">{{song.playCount}}</span>
          </div>
          {{song.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'iview';
import { mapMutations, mapGetters } from 'vuex';
export default {
  name: 'personlize',
  components: {
    Icon
  },
  computed: {
    ...mapGetters(['songList']),
    songList12() {
      // return the first 12 items.
      return this.songList.slice(0, 12);
    }
  },
  created() {
    this.$http.get('http://localhost:3000/personalized').then(d => {
      let code = d.data.code,
        data = d.data.result;
      if (code !== 200) {
        this.$Message.error = d.statusText;
      } else {
        this.SONGLIST_SET(data);
        console.log(data);
      }
    }, err => {
      console.log(err);
    })
  },
  methods: {
    ...mapMutations(['SONGLIST_SET', 'SONGLIST_SET_ACTIVE']),
    listClick(id) {
      const url = `http://localhost:3000/playlist/detail?id=${id}`;
      this.$http.get(url).then(d => {
        console.log(d);
        this.SONGLIST_SET_ACTIVE(d.data.playlist);
        this.$router.push('/playlist');
      }, error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
  .main-menu-item {
    width: 33%;
    height: 8rem;
    float: left;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center
  }
  .border-circle {
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    border: 0.5px solid #c3c3c3;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center
  }
  .personlize-list {
    width: 100%;
    padding: 5rem 0;
    box-sizing: border-box;
  }
  .song-list-collection {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  }
</style>
