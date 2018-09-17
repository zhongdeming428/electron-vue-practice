<template>
  <div class="container">
    <div class="player-btns-1">
      <Icon class="cursor-pointer" type="ios-skip-backward" size="23"/>
      <Icon class="cursor-pointer" type="ios-play" size="35"/>
      <Icon class="cursor-pointer" type="ios-skip-forward" size="23"/>
    </div>
    <div class="player-progress-bar">
      <div style="height:40px !important">
        <img width="40" height="40" alt="封面" src="https://avatars0.githubusercontent.com/u/25274581?s=40&v=4"/>
      </div>
      <div style="width:80%;display:flex;flex-direction:column;justify-content:space-between">
        <div style="width:100%;text-align:right">时长</div>
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
export default {
  name: 'player',
  components: {
    Icon
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
