<template>
  <div class="container">
    <div class="player-btns-1">
      <Icon class="cursor-pointer" type="ios-skip-backward" @click.native="playBack" size="23"/>
      <Icon class="cursor-pointer" :type="playing ? 'ios-pause' : 'ios-play'" @click.native="playClick" size="35"/>
      <Icon class="cursor-pointer" type="ios-skip-forward" @click.native="playNext" size="23"/>
    </div>
    <div class="player-progress-bar">
      <div style="height:40px !important">
        <img width="40" height="40" alt="封面" :src="coverUrl"/>
      </div>
      <div style="width:80%;display:flex;flex-direction:column;justify-content:space-between">
        <div style="width:100%">
          <div>{{name}}</div>
          <div style="text-align:right">时长：{{parseInt(time/60)}}：{{time - time%60}}</div>
        </div>
        <div class="progress-bar">
          <div ref="innerProgress"></div>
        </div>
      </div>
    </div>
    <div class="player-btns-2">
      <Icon class="cursor-pointer" type="ios-heart" size="15"/>
      <!-- <Icon class="cursor-pointer" type="" size="30"/> -->
      <Icon class="cursor-pointer" type="ios-volume-up" size="20"/>
      <Icon class="cursor-pointer" type="ios-list" size="20"/>
    </div>
  </div>
</template>

<script>
import { Icon } from 'iview';
import { mapGetters } from 'vuex';
import { Howl } from 'howler';
const eventEmitter = require('../util/event');

export default {
  name: 'player',
  components: {
    Icon
  },
  data() {
    return {
      currentPlaySongs: [],
      volume: 0.5,
      loop: false,
      sound: null,   // 播放器对象
      playing: false,   // 是否显示播放按钮
      pointer: 0,   // 当前播放歌曲的索引
      coverUrl: 'https://avatars0.githubusercontent.com/u/25274581?s=40&v=4',
      name: '歌曲名',
      time: 0,  // 已播放时长
      timer: null
    }
  },
  computed: {
    ...mapGetters(['currentPlayList'])
  },
  mounted() {
    // ...
    let that = this;
    eventEmitter.on('startPlay', function(index) {
      that.pointer = index;
      that.currentPlaySongs = that.currentPlayList.map(song => song.id);
      that.playing = true;
      if (that.sound !== null) {
        that.sound.stop();
        that.sound = null;
      }
      that.play();
    })
  },
  methods: {
    play() {
      // get the song according to song id
      let that = this;
      console.log(this.currentPlayList[0]);
      this.$http.get(`http://localhost:3000/music/url?id=${that.currentPlaySongs[that.pointer]}`).then(d => {
        if (d.data.code === 200) {
          // that.currentPlaySongs = d.data.data.map(song => song.url);
          const sound = new Howl({
            src: d.data.data[0].url,
            volume: that.volume,
            autoplay: true,
            loop: that.loop,
            onend() {
              that.playNext();
              that.timer = null;
              that.time = 0;
            },
            onplay() {
              that.timer = setInterval(() => {
                that.time += 1;
              }, 1000);
            }
          });
          that.sound = sound;
          sound.play();
          that.coverUrl = that.currentPlayList[that.pointer].al.picUrl;
          that.name = that.currentPlayList[that.pointer].name;
        } else {
          this.$Message.error = d.data.status;
        }
      }, err => {
        this.$Message.error = err.message;
      })
    },
    playClick() {
      if (this.playing) {
        this.sound.pause();
      } else {
        if (this.sound !== null) {
          this.sound.play();
        } else {
          this.play();
        }
      }
      this.playing = !this.playing;
    },
    playBack() {
      let that = this;
      if (that.sound !== null) {
        that.sound.stop();
        that.sound = null;
      }
      if (this.pointer > 0) {
        this.pointer = this.pointer - 1;
      } else {
        this.pointer = this.currentPlaySongs.length - 1;
      }
      this.play();
      this.playing = true;
    },
    playNext() {
      let that = this;
      if (that.sound !== null) {
        that.sound.stop();
        that.sound = null;
      }
      if (this.pointer < this.currentPlaySongs.length - 1) {
        this.pointer = this.pointer + 1;
      } else {
        this.pointer = 0;
      }
      this.play();
      this.playing = true;
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 4rem;
    background-color: white;
    border-top: 0.5px solid #c3c3c3;
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    padding: 1rem 6rem 1rem 1rem;
  }
  .player-btns-1,
  .player-btns-2,
  .player-progress-bar {
    float: left;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around
  }
  .player-progress-bar {
    width: 50%;
  }
  .player-progress-bar > span {
    display: inline-block
  }
  .progress-bar {
    height: 3px;
    width: 100%;
  }
  .progress-bar > div {
    background-color: #515a6e;
    width: 50%;
    height: 100%;
  }
</style>
